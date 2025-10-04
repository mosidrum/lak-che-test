import { ValidationError } from 'express-validator';
import { CustomError } from './custom-error';
import {HTTP_STATUS} from "../responses";

export class RequestValidationError extends CustomError {
    statusCode = HTTP_STATUS.UNPROCESSABLE_ENTITY;

    constructor(public errors: ValidationError[]) {
        super('Invalid request parameters');

        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }

    serializeErrors() {
        return this.errors.map((error) => {
            if (error.type === 'field') {
                return { message: error.msg, field: error.path };
            }
            return { message: error.msg };
        });
    }
}
