import { Router } from 'express';
import {
    addGuestValidation,
    addPropertyValidation, approvePropertyValidation,
    asyncMiddleware,
    checkJwt,
    loginValidation,
    registerValidation,
    validate
} from "../middleware";
import {register, loginUser, addProperty, addGuestToProperty, approveGuest} from "../controllers";
const router = Router();

router.post('/register', registerValidation, validate, asyncMiddleware(register));
router.post('/login', loginValidation, validate, asyncMiddleware(loginUser));
router.post('/create', checkJwt, addPropertyValidation, validate, asyncMiddleware(addProperty))
router.post('/guest', checkJwt, addGuestValidation, validate, asyncMiddleware(addGuestToProperty))
router.post('/approve', checkJwt, approvePropertyValidation, validate, asyncMiddleware(approveGuest))


export default router;
