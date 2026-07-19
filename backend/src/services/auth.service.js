// src/services/auth.service.js
// All authentication business logic.
// This module has no knowledge of HTTP (no req/res) — pure business rules.

import bcrypt from 'bcryptjs';
import { query } from '../config/db.js';
import { signToken } from '../utils/jwt.js';
import AppError from '../utils/AppError.js';
import { env } from '../config/env.js';

/**
 * Register a new user.
 * Returns a signed JWT and the public user object.
 *
 * @param {string} name
 * @param {string} email
 * @param {string} password  Plain-text password (will be hashed)
 * @returns {{ token: string, user: object }}
 */
export const register = async (name, email, password) => {
  // Check for duplicate email first (better error message than PG constraint)
  const existing = await query('SELECT id FROM users WHERE email = $1', [email]);
  if (existing.rows.length > 0) {
    throw new AppError('An account with this email already exists.', 409);
  }

  const saltRounds = parseInt(env.bcryptSaltRounds, 10) || 12;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const result = await query(
    `INSERT INTO users (name, email, password)
     VALUES ($1, $2, $3)
     RETURNING id, name, email, role, avatar_url, created_at`,
    [name, email, hashedPassword]
  );

  const user = result.rows[0];
  const token = signToken({ id: user.id, role: user.role });

  return { token, user };
};

/**
 * Authenticate a user with email + password.
 * Returns a signed JWT and the public user object.
 *
 * @param {string} email
 * @param {string} password  Plain-text password
 * @returns {{ token: string, user: object }}
 */
export const login = async (email, password) => {
  // Fetch the user (include password hash for comparison)
  const result = await query(
    'SELECT id, name, email, password, role, avatar_url, created_at FROM users WHERE email = $1',
    [email]
  );

  // Use a generic message to prevent user enumeration attacks
  const INVALID_CREDENTIALS = 'Invalid email or password.';

  if (result.rows.length === 0) {
    throw new AppError(INVALID_CREDENTIALS, 401);
  }

  const user = result.rows[0];
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw new AppError(INVALID_CREDENTIALS, 401);
  }

  // Strip the password hash before returning
  const { password: _pwd, ...publicUser } = user;
  const token = signToken({ id: publicUser.id, role: publicUser.role });

  return { token, user: publicUser };
};

/**
 * Fetch the authenticated user's public profile.
 *
 * @param {number} userId
 * @returns {object} User row (no password)
 */
export const getProfile = async (userId) => {
  const result = await query(
    'SELECT id, name, email, role, avatar_url, created_at FROM users WHERE id = $1',
    [userId]
  );

  if (result.rows.length === 0) {
    throw new AppError('User not found.', 404);
  }

  return result.rows[0];
};

/**
 * Forgot password — stub.
 * In production this would send a reset email via SendGrid/SES.
 * Returns success regardless of whether the email exists (prevents enumeration).
 *
 * @param {string} email
 */
export const forgotPassword = async (email) => {
  // Log the request (in production: queue an email job)
  console.log(`[AUTH] Password reset requested for: ${email}`);
  // Always returns success to prevent email enumeration
  return true;
};
