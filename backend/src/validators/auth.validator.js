// src/validators/auth.validator.js
// express-validator rule chains for the /api/v1/auth/* endpoints.

import { body, validationResult } from 'express-validator';

/**
 * validate
 * Runs validationResult and, if there are errors, creates a structured
 * error object that our errorHandler recognizes as a validation error.
 */
export const validate = (req, res, next) => {
  const result = validationResult(req);
  if (result.isEmpty()) return next();

  const err = new Error('Validation failed');
  err.errors = result.array();
  err.statusCode = 422;
  next(err);
};

/** Rules for POST /api/v1/auth/register */
export const registerRules = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required.')
    .isLength({ max: 150 }).withMessage('Name must be 150 characters or fewer.'),

  body('email')
    .trim()
    .notEmpty().withMessage('Email is required.')
    .isEmail().withMessage('Enter a valid email address.')
    .normalizeEmail(),

  body('password')
    .notEmpty().withMessage('Password is required.')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters.'),

  body('confirmPassword')
    .notEmpty().withMessage('Please confirm your password.')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match.');
      }
      return true;
    }),
];

/** Rules for POST /api/v1/auth/login */
export const loginRules = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required.')
    .isEmail().withMessage('Enter a valid email address.')
    .normalizeEmail(),

  body('password')
    .notEmpty().withMessage('Password is required.'),
];

/** Rules for POST /api/v1/auth/forgot-password */
export const forgotPasswordRules = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required.')
    .isEmail().withMessage('Enter a valid email address.')
    .normalizeEmail(),
];
