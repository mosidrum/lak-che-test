import { body, param, query } from 'express-validator';

export const createSeamAccessCodeValidation = [
    body('deviceId').notEmpty().withMessage('deviceId is required').isString().withMessage('deviceId must be a string'),
    body('name').optional().isString().withMessage('name must be a string'),
    body('code').optional().isString().withMessage('code must be a string of digits'),
    body('startsAt').optional().isISO8601().withMessage('startsAt must be an ISO8601 date string'),
    body('endsAt').optional().isISO8601().withMessage('endsAt must be an ISO8601 date string')
];

export const listSeamAccessCodesValidation = [
    query('deviceId').optional().isString().withMessage('deviceId must be a string')
];

export const getSeamAccessCodeValidation = [
    param('accessCodeId').notEmpty().withMessage('accessCodeId is required').isString().withMessage('accessCodeId must be a string')
];

