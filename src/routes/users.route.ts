import { Router } from 'express';
import {
    addPropertyValidation,
    asyncMiddleware,
    checkJwt,
    loginValidation,
    registerValidation,
    validate
} from "../middleware";
import {register, loginUser, addProperty} from "../controllers";
const router = Router();

router.post('/register', registerValidation, validate, asyncMiddleware(register));
router.post('/login', loginValidation, validate, asyncMiddleware(loginUser));
router.post('/create', checkJwt, addPropertyValidation, validate, asyncMiddleware(addProperty))


export default router;
