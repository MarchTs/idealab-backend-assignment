import { Account } from '@app/data/entities';

export interface IAccountRepository {
    findById(account_id: string): Promise<Account>;
    findAccountByEmail(email: string): Promise<Account>;
    createAccount(account: Account): Promise<Account>;
}
