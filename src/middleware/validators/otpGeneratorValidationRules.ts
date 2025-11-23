import { body } from 'express-validator';

export const otpGeneratorValidationRules = [
    body('ssn')
      .notEmpty()
      .withMessage('SSN is required')
      .isLength({ min: 4, max: 20 })
      .withMessage('SSN must be between 4 and 20 characters'),

    body('phoneNumber')
      .notEmpty()
      .withMessage('Phone number is required')
      .isMobilePhone('any')
      .withMessage('Valid phone number is required'),

    body('propertyId')
      .notEmpty()
      .withMessage('Property ID is required')
      .isUUID()
      .withMessage('Property ID must be a valid UUID'),
];
