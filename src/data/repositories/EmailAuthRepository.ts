import { EmailAuth } from '@app/data/entities';
import { IEmailAuthRepository } from '@app/data/repositories/abstractions/IEmailAuthRepository';
import { DatabaseRepository } from '@framework/database';

export class EmailAuthRepository extends DatabaseRepository<EmailAuth> implements IEmailAuthRepository {
    protected tableName: string = 'email_auth';
    async findByEmail(email: string): Promise<EmailAuth> {
        return this.first((query) => query.where('email', email));
    }

    async create(emailAuth: EmailAuth): Promise<EmailAuth> {
        await this.add(emailAuth);
        return emailAuth;
    }
}
