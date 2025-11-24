import { Seam } from 'seam';
import envConfig from '../config/envConfig';
import { BadRequestError } from '../lib';
import { logger } from './logger';

const seamClient = new Seam({
    apiKey: envConfig.SEAM_API_KEY,
    endpoint: envConfig.SEAM_BASE_URL
});

type CreateAccessCodeInput = {
    deviceId: string;
    name?: string;
    code?: string;
    startsAt?: string;
    endsAt?: string;
};

const parseSeamErrorMessage = (error: unknown): string => {
    if (
        typeof error === 'object' &&
        error !== null &&
        'response' in error &&
        typeof (error as { response?: { data?: { error?: { message?: string } } } }).response?.data === 'object'
    ) {
        const response = (error as { response?: { data?: { error?: { message?: string } } } }).response;
        const message = response?.data?.error?.message;
        if (message) return message;
    }

    if (error instanceof Error) {
        return error.message;
    }

    return 'Unknown Seam error';
};

export class SeamService {
    async listDevices() {
        try {
            return await seamClient.devices.list();
        } catch (error) {
            const message = parseSeamErrorMessage(error);
            logger.error({
                location: 'SeamService.listDevices',
                errorMessage: message
            });
            throw new BadRequestError(`Unable to fetch Seam devices: ${message}`);
        }
    }

    async listAccessCodes(deviceId?: string) {
        try {
            return await seamClient.accessCodes.list(
                deviceId ? { device_id: deviceId } : undefined
            );

        } catch (error) {
            const message = parseSeamErrorMessage(error);
            logger.error({
                location: 'SeamService.listAccessCodes',
                errorMessage: message
            });
            throw new BadRequestError(`Unable to fetch Seam access codes: ${message}`);
        }
    }

    async createAccessCode(payload: CreateAccessCodeInput) {
        try {
            return await seamClient.accessCodes.create({
                device_id: payload.deviceId,
                name: payload.name,
                code: payload.code,
                starts_at: payload.startsAt,
                ends_at: payload.endsAt
            });
        } catch (error) {
            const message = parseSeamErrorMessage(error);
            logger.error({
                location: 'SeamService.createAccessCode',
                errorMessage: message
            });
            throw new BadRequestError(`Unable to create Seam access code: ${message}`);
        }
    }

    async getAccessCode(accessCodeId: string) {
        try {
            return await seamClient.accessCodes.get({
                access_code_id: accessCodeId
            });
        } catch (error) {
            const message = parseSeamErrorMessage(error);
            logger.error({
                location: 'SeamService.getAccessCode',
                errorMessage: message
            });
            throw new BadRequestError(`Unable to retrieve Seam access code: ${message}`);
        }
    }
}

