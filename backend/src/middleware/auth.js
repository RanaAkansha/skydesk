// src/middleware/auth.js
// JWT authentication + role-based authorization middleware.
//
// Usage in routes:
//   import { authenticate, authorize } from '../middleware/auth.js';
//
//   router.get('/admin-only', authenticate, authorize('admin'), handler);
//   router.get('/any-user',   authenticate, handler);

import { verifyToken } from '../utils/jwt.js';
import AppError from '../utils/AppError.js';
import { query } from '../config/db.js';

/**
 * authenticate
 * Reads the JWT from the Authorization header, verifies it, and attaches
 * the user row to req.user. Calls next(err) on any failure.
 */
export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError('Access denied. No token provided.', 401);
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token); // throws AppError if invalid/expired

    // Fetch a fresh user row so revoked/deleted users are rejected immediately
    const result = await query(
      'SELECT id, name, email, role, avatar_url, created_at FROM users WHERE id = $1',
      [decoded.id]
    );

    if (result.rows.length === 0) {
      throw new AppError('User no longer exists.', 401);
    }

    req.user = result.rows[0]; // available in all downstream handlers
    next();
  } catch (err) {
    next(err);
  }
};

/**
 * authorize(...roles)
 * Factory that returns a middleware restricting access to the given roles.
 * Must be used AFTER authenticate (requires req.user to be set).
 *
 * @param {...string} roles  e.g. authorize('admin') or authorize('admin', 'employee')
 */
export const authorize = (...roles) =>
  (req, _res, next) => {
    if (!req.user) {
      return next(new AppError('Authentication required.', 401));
    }
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(
          `Role '${req.user.role}' is not permitted to access this resource.`,
          403
        )
      );
    }
    next();
  };
