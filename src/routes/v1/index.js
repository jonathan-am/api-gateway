import { Router } from 'express';
import orderRoute from './order.route';
import authRoute from './auth.route';

const router = Router();

router.use('/order', orderRoute);
router.use('/login', authRoute);

export default router;
