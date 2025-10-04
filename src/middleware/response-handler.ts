import { NextFunction, Request, Response } from 'express';
import {logger} from "../services";
import { HTTP_STATUS } from '../lib';

export const responseLogger = (req: Request, res: Response, next: NextFunction) => {
    const startTime = Date.now();
    logger.info(`API request received: ${req.method} ${req.path}`);

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

        logger[logLevel](`${responseMessage} - Status: ${res.statusCode} - Response time: ${responseTime}ms`);
    });

    next();
};
