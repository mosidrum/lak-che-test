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
