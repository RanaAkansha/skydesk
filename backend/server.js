// server.js
// Main entry point for the SkyDesk REST API.
// Loads environment → registers middleware → mounts routes → starts server.

import './src/config/env.js';       // Must be first — validates env vars before anything else
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';

import { env } from './src/config/env.js';
import errorHandler from './src/middleware/errorHandler.js';

// ─── App Setup ────────────────────────────────────────────────

const app = express();

// ─── Security Middleware ───────────────────────────────────────

// Helmet sets security-related HTTP response headers
app.use(helmet());

// CORS — allow only the frontend origin
app.use(
  cors({
    origin: env.frontendUrl,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// ─── Request Logging ──────────────────────────────────────────

// 'dev' format in development (coloured, concise), 'combined' in production
app.use(morgan(env.isDev ? 'dev' : 'combined'));

// ─── Body Parsing ─────────────────────────────────────────────

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Health Check ─────────────────────────────────────────────

app.get('/api/health', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'SkyDesk API is running',
    data: {
      environment: env.nodeEnv,
      timestamp: new Date().toISOString(),
    },
  });
});

import apiRouter from './src/routes/index.js';

app.use('/api', apiRouter);

// ─── 404 Handler ──────────────────────────────────────────────

app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    data: null,
  });
});

// ─── Centralized Error Handler ────────────────────────────────
// Must be registered AFTER all routes

app.use(errorHandler);

// ─── Start Server ─────────────────────────────────────────────

app.listen(env.port, () => {
  console.log(`🚀  SkyDesk API running on http://localhost:${env.port}`);
  console.log(`📦  Environment: ${env.nodeEnv}`);
});

export default app;
