import { IAppUnitOfWork } from '@app/data/abstractions/IAppUnitOfWork';
import { Account } from '@app/data/entities';
import { Service } from 'typedi';

@Service()
export class AccountDomainService {
    async createAccount(uow: IAppUnitOfWork, account: Account): Promise<Account> {
        return uow.accountRepository.createAccount(account);
    }

    async getAccountById(uow: IAppUnitOfWork, account_id: string): Promise<Account> {
        const result = await uow.accountRepository.findById(account_id);
        if (!result) {
            throw new Error('Account not found');
        }
        return result;
    }
}
