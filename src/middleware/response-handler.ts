import { NextFunction, Request, Response } from 'express';
import {logger} from "../services";
import { HTTP_STATUS } from '../lib';

export const responseLogger = (req: Request, res: Response, next: NextFunction) => {
    const startTime = Date.now();

    let responseBody: unknown;
    const originalSend = res.send;

    res.send = function (...args: unknown[]) {
        responseBody = args[0];
        return Reflect.apply(originalSend, this, args);
    };

    res.on('finish', () => {
        const responseTime = Date.now() - startTime;

        const logLevel: 'info' | 'warn' | 'error' =
          res.statusCode >= HTTP_STATUS.INTERNAL_SERVER_ERROR
            ? 'error'
            : res.statusCode >= HTTP_STATUS.BAD_REQUEST
              ? 'warn'
              : 'info';

        const responseMessage =
          typeof responseBody === 'object' && responseBody !== null && 'message' in responseBody
            ? (responseBody as { message: string }).message
            : 'API response sent';

        const summary = `${req.method} ${req.originalUrl} → ${res.statusCode} (${responseTime}ms)`;
        const message =
          logLevel === 'info'
              ? summary
              : `${summary} :: ${responseMessage}`;

        logger[logLevel]({
            message,
            location: 'responseLogger'
        });
    });

    next();
};
