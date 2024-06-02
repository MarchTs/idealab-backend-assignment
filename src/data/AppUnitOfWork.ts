import { IAppUnitOfWork } from '@app/data/abstractions/IAppUnitOfWork';
import { Database, DatabaseUnitOfWork } from '@framework/database';
import { IAccountRepository, IEmailAuthRepository } from './repositories';
import { AccountRepository } from './repositories/AccountRepository';
import { EmailAuthRepository } from './repositories/EmailAuthRepository';
import { InfluencerRepository } from './repositories/InfluencerRepository';
import { IInfluencerRepository } from './repositories/abstractions/IInfluencerRepository';

export class AppUnitOfWork extends DatabaseUnitOfWork implements IAppUnitOfWork {
    influencerRepository: IInfluencerRepository;
    accountRepository: IAccountRepository;
    emailAuthRepository: IEmailAuthRepository;

    constructor(connection: Database) {
        super(connection);
        this.influencerRepository = new InfluencerRepository(this);
        this.accountRepository = new AccountRepository(this);
        this.emailAuthRepository = new EmailAuthRepository(this);
    }
}
