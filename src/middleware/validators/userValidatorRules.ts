import { body } from 'express-validator';

export const registerValidation = [
    body('fullName')
        .exists().withMessage('Full name is required')
        .isString().withMessage('Full name must be a string')
        .trim()
        .notEmpty().withMessage('Full name cannot be empty'),
    body('email')
        .exists().withMessage('Email is required')
        .isEmail().withMessage('Email must be valid')
        .normalizeEmail(),
    body('phone')
        .exists().withMessage('Phone number is required')
        .isString().withMessage('Phone number must be a string')
        .trim()
        .notEmpty().withMessage('Phone number cannot be empty'),
    body('password')
        .exists().withMessage('Password is required')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
];

export const verifyEmailValidation = [
    body('email')
        .exists().withMessage('Email is required')
        .isEmail().withMessage('Email must be valid')
        .normalizeEmail(),
    body('otp')
        .exists().withMessage('Verification code is required')
        .isLength({ min: 4 }).withMessage('Verification code must be at least 4 characters long')
        .isString().withMessage('Verification code must be a string')
];

export const loginValidation = [
    body('email')
        .exists().withMessage('Email is required')
        .isEmail().withMessage('Email must be valid')
        .normalizeEmail(),
    body('password')
        .exists().withMessage('Password is required')
        .isString().withMessage('Password must be a string')
        .notEmpty().withMessage('Password cannot be empty')
];

export const changePasswordValidation = [
    body('email')
        .exists().withMessage('Email is required')
        .isEmail().withMessage('Email must be valid')
        .normalizeEmail(),
    body('currentPassword')
        .exists().withMessage('Current password is required')
        .isString().withMessage('Current password must be a string')
        .notEmpty().withMessage('Current password cannot be empty'),
    body('newPassword')
        .exists().withMessage('New password is required')
        .isLength({ min: 8 }).withMessage('New password must be at least 8 characters long')
        .custom((value, { req }) => {
            if (value === req.body.currentPassword) {
                throw new Error('New password must be different from the current password');
            }
            return true;
        })
];
