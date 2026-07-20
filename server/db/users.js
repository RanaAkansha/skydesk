
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import crypto from 'crypto'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DATA_FILE = path.join(__dirname, '..', 'data', 'users.json')

function ensureDataFile() {
  if (!fs.existsSync(DATA_FILE)) {
    fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true })
    fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2))
  }
}

function readAll() {
  ensureDataFile()
  const raw = fs.readFileSync(DATA_FILE, 'utf-8')
  try {
    return JSON.parse(raw)
  } catch {
    return []
  }
}

function writeAll(users) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2))
}

export function findByEmail(email) {
  const users = readAll()
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase()) || null
}

export function findById(id) {
  const users = readAll()
  return users.find((u) => u.id === id) || null
}

export function insert({ fullName, email, phone, passwordHash }) {
  const users = readAll()
  const user = {
    id: crypto.randomUUID(),
    fullName,
    email,
    phone,
    passwordHash,
    createdAt: new Date().toISOString(),
  }
  users.push(user)
  writeAll(users)
  return user
}

// Strips the password hash before sending a user object back to the client.
export function toPublicUser(user) {
  if (!user) return null
  const { passwordHash, ...publicUser } = user
  return publicUser
}
