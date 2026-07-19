// src/config/db.js
// PostgreSQL connection pool using the 'pg' library.
// All database queries go through the exported query() wrapper.
// The pool is tested once on startup so you know immediately if the DB is unreachable.

import pg from 'pg';
import { env } from './env.js';

const { Pool } = pg;

const pool = new Pool({
  connectionString: env.databaseUrl,
  // Keep connections alive and limit pool size for a dev/small-scale setup
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Test the connection when the module is first loaded
pool.connect((err, client, release) => {
  if (err) {
    console.error('❌  Database connection failed:', err.message);
    return;
  }
  console.log('✅  PostgreSQL connected successfully');
  release();
});

// Thin query wrapper — pass sql and optional params array
export const query = (sql, params) => pool.query(sql, params);

export default pool;
