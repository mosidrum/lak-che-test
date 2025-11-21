import { CustomError } from './custom-error';
import { HTTP_STATUS } from '../responses';

export class UnauthorizedError extends CustomError {
    statusCode = HTTP_STATUS.UNAUTHORIZED;

    constructor(public message: string) {
        super(message);
        Object.setPrototypeOf(this, UnauthorizedError.prototype);
    }

    serializeErrors() {
        return [{ message: this.message }];
    }
}


