import { Router } from 'express';
import {
    asyncMiddleware,
    checkJwt,
    createSeamAccessCodeValidation,
    getSeamAccessCodeValidation,
    listSeamAccessCodesValidation,
    validate
} from '../middleware';
import {
    createSeamAccessCode,
    getSeamAccessCode,
    listSeamAccessCodes,
    listSeamDevices
} from '../controllers';

const router = Router();

router.get('/devices', checkJwt, asyncMiddleware(listSeamDevices));
router.get(
    '/access-codes',
    checkJwt,
    listSeamAccessCodesValidation,
    validate,
    asyncMiddleware(listSeamAccessCodes)
);
router.post(
    '/access-codes',
    checkJwt,
    createSeamAccessCodeValidation,
    validate,
    asyncMiddleware(createSeamAccessCode)
);
router.get(
    '/access-codes/:accessCodeId',
    checkJwt,
    getSeamAccessCodeValidation,
    validate,
    asyncMiddleware(getSeamAccessCode)
);

export default router;

