import {body} from "express-validator";

export const createUserValidation = [
  body('email').exists().withMessage('email is required').isEmail().withMessage('This must be a proper email address'),
  body('name')
    .exists()
    .withMessage('Name is required')
    .notEmpty()
    .withMessage('Name cannot be empty')
    .isString()
    .withMessage('Name must be a string'),
]
