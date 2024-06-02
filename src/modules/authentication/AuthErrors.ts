import { ConflictError, NotFoundError } from '@app/Errors/HttpError';

export class EmailAuthNotFound extends NotFoundError {
    constructor() {
        super('Email not found');
    }
}

export class EmailAuthAlreadyExists extends ConflictError {
    constructor() {
        super('Email already exists');
    }
}
