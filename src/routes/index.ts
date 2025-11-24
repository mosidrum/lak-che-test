import { Router } from 'express';
import usersRoutes from './users.route';
import seamRoutes from './seam.route';

const router = Router();

router.use('/user', usersRoutes);
router.use('/seam', seamRoutes);

export default router;
