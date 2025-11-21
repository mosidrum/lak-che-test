import jwt from 'jsonwebtoken';

import { logger } from '../services';
import envConfig from "../config/envConfig";

export type JwtPayload = {
    id: string;
    name: string;
    email: string;
};

export const JwtHelper = {
    generateToken: (data: JwtPayload) => jwt.sign(data, envConfig.JWT_SECRET, { expiresIn: '21d' }),
    verifyToken: (token: string): JwtPayload => {
        try {
            return jwt.verify(token, envConfig.JWT_SECRET) as JwtPayload;
            //eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            logger.error({
                message: `Error verifying token: ${error.message}`
            });
            throw error;
        }
    }
};
