import { BadRequestError, InternalServerError } from 'routing-controllers';

export class InvalidEmailOrPasswordError extends BadRequestError {
    constructor() {
        super('Invalid email or password');
    }
}

export class FirebaseUserError extends InternalServerError {
    constructor() {
        super('Cannot create Firebase user');
    }
}

export class FirebaseUserAlreadyExistsError extends BadRequestError {
    constructor() {
        super('Email already in-use with another account');
    }
}
