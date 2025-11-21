import { Router } from 'express';
import {
    asyncMiddleware,
    changePasswordValidation,
    loginValidation,
    registerValidation,
    validate,
    verifyEmailValidation
} from '../middleware';
import { changePassword, loginUser, registerUser, verifyEmail } from '../controllers';

const router = Router();

router.post('/register', registerValidation, validate, asyncMiddleware(registerUser));
router.post('/verify-email', verifyEmailValidation, validate, asyncMiddleware(verifyEmail));
router.post('/login', loginValidation, validate, asyncMiddleware(loginUser));
router.patch('/change-password', changePasswordValidation, validate, asyncMiddleware(changePassword));

export default router;


