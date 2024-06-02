import { HttpError } from 'routing-controllers';

export class BadRequestError extends HttpError {
    constructor(message: string = 'Invalid request, please check your request data and try again.') {
        super(400, message);
    }
}

export class UnauthorizedError extends HttpError {
    constructor(message: string = 'Access is denied due to invalid credentials.') {
        super(401, message);
    }
}

export class PaymentRequiredError extends HttpError {
    constructor(message: string = 'Cannot purchase the upfront package due to payment issues.') {
        super(402, message);
    }
}

export class ForbiddenError extends HttpError {
    constructor(message: string = "You don't have the right to do this action, please contact administration for further instruction.") {
        super(403, message);
    }
}

export class NotFoundError extends HttpError {
    constructor(message: string = 'The requested resource could not be found.') {
        super(404, message);
    }
}
export class WalletNotFoundError extends HttpError {
    constructor(message: string = 'The specified project is not exists.') {
        super(404, message);
    }
}

export class NotAcceptableError extends HttpError {
    constructor(message: string = 'Something went wrong, please try again later.') {
        super(406, message);
    }
}

export class ConflictError extends HttpError {
    constructor(message: string = 'This resource has an action in progress that would conflict with this request.') {
        super(409, message);
    }
}

export class InvalidOperation extends HttpError {
    constructor(message: string = 'This resource has an invalid data that would conflict with this request') {
        super(409, message);
    }
}
export class RestrictedPaymentError extends HttpError {
    constructor(message: string = 'Cannot purchase the upfront package due to restricted wallet type.') {
        super(409, message);
    }
}

export class LimitExceededError extends HttpError {
    constructor(message: string = 'LimitExceeded: Maximum number of quota') {
        super(413, message);
    }
}

export class InternalServerError extends HttpError {
    constructor(message: string = 'Something went wrong, please contact administrator for further instruction.') {
        super(500, message);
    }
}
