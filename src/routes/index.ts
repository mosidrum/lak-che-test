import { Router } from 'express';
import usersRoutes from './users.route';
import guestRoutes from './guest.route';

const router = Router();

router.use('/user', usersRoutes);
router.use('/guest', guestRoutes);

export default router;
