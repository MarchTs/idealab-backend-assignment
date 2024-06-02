import { FirebaseAuthAdapter } from '@app/adapters/FirebaseAdapter';
import { IAppUnitOfWork } from '@app/data/abstractions/IAppUnitOfWork';
import { AppUnitOfWorkFactoryIdentifier, IAppUnitOfWorkFactory } from '@app/data/abstractions/IAppUnitOfWorkFactory';
import { Account, EmailAuth } from '@app/data/entities';
import { AccountDomainService } from '@app/modules/account';
import { EmailAuthDomainService } from '@app/modules/authentication/EmailAuthDomainService';
import { EmailAuthLoginRequest } from '@app/modules/authentication/requests/EmailAuthLoginRequest';
import { using } from '@framework/core';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Action } from 'routing-controllers';
import { Inject, Service } from 'typedi';
import { EmailAuthAlreadyExists } from './AuthErrors';

@Service()
export class AuthService {
    private secret = 'Bzp1F91qKI0xG5C';

    @Inject(AppUnitOfWorkFactoryIdentifier)
    private _appUnitOfWorkFactory: IAppUnitOfWorkFactory;

    @Inject()
    private readonly _firebaseAuthAdapter: FirebaseAuthAdapter;

    @Inject()
    private readonly _emailAuthDomainService: EmailAuthDomainService;

    @Inject()
    private readonly _accountDomainService: AccountDomainService;

    public async registerEmail(request: EmailAuthLoginRequest): Promise<Account> {
        const { email, password } = request;
        const context = using(this._appUnitOfWorkFactory.create());
        return context(async (uow: IAppUnitOfWork) => {
            await uow.initialize({});
            const account = Account.default();
            const existsEmailAuth = await this._emailAuthDomainService.findEmailAuthByEmail(uow, email);
            if (existsEmailAuth) {
                throw new EmailAuthAlreadyExists();
            }
            const authResult = await this._firebaseAuthAdapter.createUser(email, password);
            const emailAuth = EmailAuth.fromFirebaseAuthResult(authResult, account);
            await this._emailAuthDomainService.createEmailAuth(uow, emailAuth);
            await this._accountDomainService.createAccount(uow, account);
            await uow.saveChanges();
            return account;
        });
    }

    public async loginEmail(request: EmailAuthLoginRequest): Promise<Account> {
        const { email, password } = request;
        const context = using(this._appUnitOfWorkFactory.create());
        return context(async (uow: IAppUnitOfWork) => {
            await uow.initialize({});
            const existsEmailAuth = await this._emailAuthDomainService.getEmailAuthByEmail(uow, email);
            const account = await this._accountDomainService.getAccountById(uow, existsEmailAuth.account_id);
            await this._firebaseAuthAdapter.loginUser(email, password);
            return account;
        });
    }

    public async createJwtToken(account: Account): Promise<string> {
        const payload: JwtPayload = { roles: account.roles, accountId: account.account_id };
        return jwt.sign(payload, this.secret);
    }

    public async authorizationChecker(action: Action, roles: string[]): Promise<boolean> {
        try {
            const token = action.request.headers['authorization'].replace('Bearer ', '');
            const jwtPayload: JwtPayload = jwt.verify(token, this.secret) as JwtPayload;
            if (roles.length === 0) {
                return !!jwtPayload;
            }
            const result = jwtPayload && (!roles.length || roles.some((row) => jwtPayload.roles.includes(row)));
            console.log(`authorizationChecker`, result);
            return result;
        } catch (e) {
            return false;
        }
    }
}
