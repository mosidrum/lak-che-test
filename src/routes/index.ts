import { Router } from 'express';
import user from './user.route';
import auth from './auth.route';

const router = Router();

router.use('/users', user);
router.use('/auth', auth);

export default router;
