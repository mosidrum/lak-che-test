import {JwtHelper, JwtPayload, UnauthorizedError} from '../lib';

import type { NextFunction, Request, Response } from 'express';

export interface IExtendedRequest extends Request {
    user: JwtPayload;
}

export const checkJwt = (req: Request, _: Response, next: NextFunction): void => {
    const extendedReq = req as unknown as IExtendedRequest;
    const token = extendedReq.headers.authorization?.split(' ')[1];

    if (!token) {
        next(new UnauthorizedError('You must be Authorized to access this resource'));
        return;
    }

    try {
        extendedReq.user = JwtHelper.verifyToken(token) as JwtPayload;
        next();
    } catch {
        next(new UnauthorizedError('Invalid or expired token'));
    }
};
