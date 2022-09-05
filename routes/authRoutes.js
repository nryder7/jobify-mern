import express from 'express';
const router = express.Router();
import authUserMiddleware from '../middleware/auth.js';
import { register, login, update } from '../controllers/authController.js';
import rateLimiter from 'express-rate-limit';
const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: 'Too many requests. Try again later',
});

router.route('/register').post(apiLimiter, register);
router.route('/login').post(apiLimiter, login);
router.route('/update').patch(authUserMiddleware, update);

export default router;
