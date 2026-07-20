import { verifyToken } from '../utils/token.js'
import { findById, toPublicUser } from '../db/users.js'

// Protects a route: requires a valid "Authorization: Bearer <token>" header.
// Attaches the authenticated user to req.user, or responds 401.
export function requireAuth(req, res, next) {
  const header = req.headers.authorization || ''
  const [scheme, token] = header.split(' ')

  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ error: 'Missing or malformed Authorization header.' })
  }

  try {
    const payload = verifyToken(token)
    const user = findById(payload.sub)
    if (!user) {
      return res.status(401).json({ error: 'User no longer exists.' })
    }
    req.user = toPublicUser(user)
    next()
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token.' })
  }
}
