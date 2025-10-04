import { CustomError } from './custom-error';
import {HTTP_STATUS} from "../responses";

export class BadRequestError extends CustomError {
    statusCode = HTTP_STATUS.BAD_REQUEST;

    constructor(public message: string) {
        super(message);
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }

    serializeErrors() {
        return [{ message: this.message }];
    }
}
