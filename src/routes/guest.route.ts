import { Router } from 'express';
import {otpGeneratorValidationRules} from "../middleware/validators/otpGeneratorValidationRules";
import {asyncMiddleware, validate} from "../middleware";
import {sendCodeToConfirmGuest} from "../controllers";

const router = Router();

router.post('/generate', otpGeneratorValidationRules, validate, asyncMiddleware(sendCodeToConfirmGuest))

export default router;
