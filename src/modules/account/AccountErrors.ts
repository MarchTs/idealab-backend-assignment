import { NotFoundError } from 'routing-controllers';

export class AccountNotFoundError extends NotFoundError {
    constructor() {
        super('Account not found');
    }
}
