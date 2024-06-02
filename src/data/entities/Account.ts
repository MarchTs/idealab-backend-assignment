import { randomUUID } from 'crypto';

export class Account {
    account_id: string;
    roles: string[];
    created_at: Date;
    updated_at: Date;
    constructor(payload: { account_id: string; roles?: string[]; createdAt?: Date; updatedAt?: Date }) {
        this.account_id = payload.account_id;
        this.roles = payload.roles ?? [];
        this.created_at = payload.createdAt ?? new Date();
        this.updated_at = payload.updatedAt ?? new Date();
    }

    static default(): Account {
        return new Account({ account_id: randomUUID() });
    }
}
