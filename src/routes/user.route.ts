import {Router} from "express";
import {asyncMiddleware, createUserValidation, validate} from "../middleware";
import {createUser} from "../controllers";

const router = Router();

router.post('/create', createUserValidation, validate, asyncMiddleware(createUser))

export default router;
