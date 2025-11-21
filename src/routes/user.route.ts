import {Router} from "express";
import {asyncMiddleware, registerValidation, validate} from "../middleware";
import {createUser} from "../controllers";

const router = Router();

router.post('/create', registerValidation, validate, asyncMiddleware(createUser))

export default router;
