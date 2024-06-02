import { Account } from '@app/data/entities';
import { randomUUID } from 'crypto';
import { UserCredential } from 'firebase/auth';

export class EmailAuth {
    id: string;
    account_id: string;
    email: string;
    created_at: Date;
    updated_at: Date;

    constructor(payload: { id: string; account_id: string; email: string; created_at: Date; updated_at: Date }) {
        this.id = payload.id;
        this.account_id = payload.account_id;
        this.email = payload.email;
        this.created_at = payload.created_at ?? new Date();
        this.updated_at = payload.updated_at ?? new Date();
    }

    static fromFirebaseAuthResult(authResult: UserCredential, account: Account) {
        return new EmailAuth({
            id: randomUUID(),
            account_id: account.account_id,
            email: authResult.user.email,
            created_at: new Date(),
            updated_at: new Date(),
        });
    }
}
