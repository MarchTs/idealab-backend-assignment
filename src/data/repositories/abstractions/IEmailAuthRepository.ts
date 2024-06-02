import { EmailAuth } from '@app/data/entities';

export interface IEmailAuthRepository {
    findByEmail(email: string): Promise<EmailAuth>;
    create(emailAuth: EmailAuth): Promise<EmailAuth>;
}
