import { Account } from '@app/data/entities';
import { IAccountRepository } from '@app/data/repositories/abstractions/IAccountRepository';
import { DatabaseRepository } from '@framework/database';

export class AccountRepository extends DatabaseRepository<Account> implements IAccountRepository {
    protected tableName: string = 'account';
    async findAccountByEmail(email: string): Promise<Account> {
        return this.first((query) => query.where('email', email));
    }

    async createAccount(account: Account): Promise<Account> {
        await this.add(account);
        return account;
    }

    async findById(account_id: string): Promise<Account> {
        return this.first((query) => query.where('account_id', account_id));
    }
}
