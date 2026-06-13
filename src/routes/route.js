import Router from 'express';
import authRoutes from './auth.route.js';
import blogRoutes from './blog.route.js';
import userRoutes from './user.route.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
const router = Router();

router.use('/v1/auth', authRoutes);
router.use('/v1/blog', blogRoutes);
router.use('/v1/user', userRoutes);

export default router;