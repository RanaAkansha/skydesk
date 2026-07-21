// src/routes/auth.routes.js

import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import { authLimiter } from '../middleware/rateLimiter.js';
import * as authController from '../controllers/auth.controller.js';
import {
  registerRules,
  loginRules,
  forgotPasswordRules,
  validate,
} from '../validators/auth.validator.js';

const router = Router();

// Apply the stricter auth rate limiter to all auth routes
router.use(authLimiter);

router.post('/register',        registerRules,       validate, authController.register);
router.post('/signup',          registerRules,       validate, authController.register);
router.post('/login',           loginRules,          validate, authController.login);
router.post('/signin',          loginRules,          validate, authController.login);
router.post('/forgot-password', forgotPasswordRules, validate, authController.forgotPassword);

// Protected
router.get('/me', authenticate, authController.getMe);

export default router;
