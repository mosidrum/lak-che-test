import { Request, Response } from 'express';
import { HTTP_STATUS } from '../lib';
import { SeamService } from '../services';

const seamService = new SeamService();

export const listSeamDevices = async (_req: Request, res: Response) => {
    const devices = await seamService.listDevices();

    res.status(HTTP_STATUS.OK).json({
        message: 'Seam devices retrieved successfully',
        data: { devices }
    });
};

export const listSeamAccessCodes = async (req: Request, res: Response) => {
    const { deviceId } = req.query as { deviceId?: string };
    const accessCodes = await seamService.listAccessCodes(deviceId);

    res.status(HTTP_STATUS.OK).json({
        message: 'Seam access codes retrieved successfully',
        data: { accessCodes }
    });
};

export const createSeamAccessCode = async (req: Request, res: Response) => {
    const { deviceId, name, code, startsAt, endsAt } = req.body;
    const accessCode = await seamService.createAccessCode({
        deviceId,
        name,
        code,
        startsAt,
        endsAt
    });

    res.status(HTTP_STATUS.CREATED).json({
        message: 'Seam access code created successfully',
        data: { accessCode }
    });
};

export const getSeamAccessCode = async (req: Request, res: Response) => {
    const { accessCodeId } = req.params;
    const accessCode = await seamService.getAccessCode(accessCodeId);

    res.status(HTTP_STATUS.OK).json({
        message: 'Seam access code retrieved successfully',
        data: { accessCode }
    });
};

