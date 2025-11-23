import { Router } from 'express';
import {
    addPropertyValidation, approvePropertyValidation,
    asyncMiddleware,
    checkJwt,
    loginValidation,
    registerValidation,
    validate
} from "../middleware";
import {register, loginUser, addProperty, approveLetting} from "../controllers";
const router = Router();

router.post('/register', registerValidation, validate, asyncMiddleware(register));
router.post('/login', loginValidation, validate, asyncMiddleware(loginUser));
router.post('/create', checkJwt, addPropertyValidation, validate, asyncMiddleware(addProperty))
router.post('/approve', checkJwt, approvePropertyValidation, validate, asyncMiddleware(approveLetting))


export default router;
