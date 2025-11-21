import { Router } from 'express';
import usersRoutes from './users.route';
import ownersRoutes from './owner.route';

const router = Router();

router.use('/user', usersRoutes);
router.use('/owner', ownersRoutes);

export default router;
