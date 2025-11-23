import { Router } from 'express';
import usersRoutes from './users.route';

const router = Router();

router.use('/user', usersRoutes);

export default router;
