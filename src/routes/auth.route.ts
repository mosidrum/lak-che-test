import { Router } from 'express';
import {
    asyncMiddleware,
    changePasswordValidation,
    loginValidation,
    validate
} from '../middleware';
import { changePassword, loginUser } from '../controllers';

const router = Router();

router.post('/login', loginValidation, validate, asyncMiddleware(loginUser));
router.patch('/change-password', changePasswordValidation, validate, asyncMiddleware(changePassword));

export default router;


