import { Router } from 'express'
import bcrypt from 'bcryptjs'
import { findByEmail, insert, toPublicUser } from '../db/users.js'
import { signToken } from '../utils/token.js'
import { requireAuth } from '../middleware/authMiddleware.js'

const router = Router()
const EMAIL_RE = /\S+@\S+\.\S+/

// ── POST /api/auth/signup ──────────────────────────────────
// Only creates the account. Deliberately does NOT return a token —
// signup and signin are separate actions, so a new user always has
// to go through the sign-in form afterwards, on purpose.
router.post('/signup', async (req, res) => {
  const { fullName, email, phone, password } = req.body || {}

  const errors = {}
  if (!fullName || !fullName.trim()) errors.fullName = 'Full name is required.'
  if (!email || !EMAIL_RE.test(email)) errors.email = 'Enter a valid email address.'
  if (!phone || phone.replace(/\D/g, '').length < 8) errors.phone = 'Enter a valid phone number.'
  if (!password || password.length < 8) errors.password = 'Password must be at least 8 characters.'

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ error: 'Validation failed.', fields: errors })
  }

  if (findByEmail(email)) {
    return res.status(409).json({ error: 'An account with this email already exists.', fields: { email: 'Email already in use.' } })
  }

  const passwordHash = await bcrypt.hash(password, 10)
  const user = insert({ fullName: fullName.trim(), email: email.toLowerCase().trim(), phone, passwordHash })

  res.status(201).json({ user: toPublicUser(user) })
})

// ── POST /api/auth/signin ──────────────────────────────────
router.post('/signin', async (req, res) => {
  const { email, password } = req.body || {}

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' })
  }

  const user = findByEmail(email)
  if (!user) {
    // Same error for "no such user" and "wrong password" — don't leak which emails exist.
    return res.status(401).json({ error: 'Invalid email or password.' })
  }

  const valid = await bcrypt.compare(password, user.passwordHash)
  if (!valid) {
    return res.status(401).json({ error: 'Invalid email or password.' })
  }

  const token = signToken({ sub: user.id })
  res.json({ token, user: toPublicUser(user) })
})

// ── GET /api/auth/me ────────────────────────────────────────
// Protected route used by the frontend to validate a stored
// token on app load / refresh, and to fetch the current user.
router.get('/me', requireAuth, (req, res) => {
  res.json({ user: req.user })
})

export default router
