import './env.js'

import express from 'express'
import cors from 'cors'
import authRoutes from './routes/auth.js'
import chatRoutes from './routes/chat.js'

const app = express()
const PORT = process.env.PORT || 5000
const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map((o) => o.trim())

app.use(cors({ origin: allowedOrigins, credentials: true }))
app.use(express.json())

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'skydesk-auth-server' })
})

app.use('/api/auth', authRoutes)
app.use('/api/chat', chatRoutes)

// 404 fallback
app.use((req, res) => {
  res.status(404).json({ error: 'Not found.' })
})

// Central error handler (catches thrown/rejected errors from routes)
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ error: 'Something went wrong on the server.' })
})

app.listen(PORT, () => {
  console.log(`SkyDesk auth server running at http://localhost:${PORT}`)
})
