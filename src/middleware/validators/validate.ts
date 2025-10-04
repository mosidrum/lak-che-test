import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import {RequestValidationError} from "../../lib";

export const validate = (req: Request, _: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }

    throw new RequestValidationError(errors.array());
};
