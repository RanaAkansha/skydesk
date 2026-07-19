// src/controllers/auth.controller.js
import { sendSuccess } from '../utils/response.js';
import * as authService from '../services/auth.service.js';
import { HTTP_STATUS } from '../constants/index.js';

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const result = await authService.register(name, email, password);
    sendSuccess(res, result, 'Account created successfully.', HTTP_STATUS.CREATED);
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    sendSuccess(res, result, 'Signed in successfully.');
  } catch (err) {
    next(err);
  }
};

export const getMe = async (req, res, next) => {
  try {
    const user = await authService.getProfile(req.user.id);
    sendSuccess(res, { user }, 'Profile fetched successfully.');
  } catch (err) {
    next(err);
  }
};

export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    await authService.forgotPassword(email);
    sendSuccess(res, null, 'If an account exists for this email, a reset link has been sent.');
  } catch (err) {
    next(err);
  }
};
