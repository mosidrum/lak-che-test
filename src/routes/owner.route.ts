import { Router } from 'express';
import {addPropertyValidation, asyncMiddleware, checkJwt, validate} from "../middleware";
import {addProperty} from "../controllers";

const router = Router();

router.post('/create', checkJwt, addPropertyValidation, validate, asyncMiddleware(addProperty))
export default router;
