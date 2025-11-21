import { Router } from 'express';
import {asyncMiddleware, loginValidation, registerValidation, validate} from "../middleware";
import {register, loginUser} from "../controllers";
const router = Router();

router.post('/register', registerValidation, validate, asyncMiddleware(register));
router.post('/login', loginValidation, validate, asyncMiddleware(loginUser));

export default router;
