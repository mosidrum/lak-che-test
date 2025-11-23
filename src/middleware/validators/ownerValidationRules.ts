import {body} from "express-validator";

export const addPropertyValidation = [
  body('name')
    .notEmpty()
    .withMessage('Property name is required')
    .isString()
    .withMessage('Property name must be a string'),
  body('address')
    .notEmpty()
    .withMessage('Property address is required')
    .isString().withMessage('Property address must be a string'),
  body('image')
    .notEmpty()
    .withMessage('Property image is required')
    .isString()
    .withMessage('Property image must be a string'),
]

export const addGuestValidation = [
    body('propertyId').notEmpty().withMessage('Property ID is required').isUUID().withMessage('Property ID must be a valid UUID').isString().withMessage('Property ID must be a string'),
  body('phoneNumber').notEmpty().withMessage('Phone number is required').isString().withMessage('Phone number must be a string')
]

export const approvePropertyValidation = [
    body('propertyId').notEmpty().withMessage('Property ID is required').isUUID().withMessage('Property ID must be a valid UUID').isString().withMessage('Property ID must be a string'),
    body('phoneNumber').notEmpty().withMessage('Phone number is required').isString().withMessage('Phone number must be a string')
]
