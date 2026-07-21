# SkyDesk – Travel & Expense Management Monorepo

SkyDesk is a modern **Travel & Expense Management System** built with **React + Vite** on the frontend, **Express + Node.js** on the backend, and **PostgreSQL** using the **Prisma ORM**.

This repository is structured as a professional, production-ready monorepo using **npm workspaces**.

---

## 1. Project Architecture

The application is split into two modular workspace packages:

```text
skydesk/
├── frontend/             ← React + Vite frontend application
│   ├── public/           ← Static client assets (logos, icons)
│   ├── src/              ← React components, pages, context, and hooks
│   ├── package.json      ← Client-specific dependencies
│   ├── vite.config.js    ← Vite configurations & Tailwind CSS setup
│   └── ...
│
├── backend/              ← Express REST API & Database layer
│   ├── src/
│   │   ├── config/       ← Environment validation & Database pool connection
│   │   ├── controllers/  ← Request/response handlers (Auth, Trips, Bookings, Expenses, Chat)
│   │   ├── middleware/   ← Global handlers, Rate Limiters, JWT Auth verification
│   │   ├── routes/       ← Express Router configuration (bundled at /api)
│   │   ├── services/     ← Business logic & database interaction services
│   │   ├── utils/        ← Response formatters, Custom Errors, JWT helpers
│   │   └── validators/   ← Request input validations (express-validator)
│   ├── prisma/           ← Prisma ORM Schema, Migrations, and Seed script
│   ├── server.js         ← Express server entry point
│   ├── package.json      ← Server-specific dependencies
│   └── ...
│
├── package.json          ← Workspaces root container & shared scripts
├── .gitignore            ← Global file exclusions (node_modules, .env)
└── README.md             ← Reorganization guide & instructions
```

---

## 2. Tech Stack

| Layer | Technologies | Purpose |
| :--- | :--- | :--- |
| **Frontend** | React (v19), Vite, Tailwind CSS, Lucide icons, Recharts | User Interface, Charts, Styling |
| **Backend** | Node.js (ESM), Express.js, Helmet, CORS, Morgan | REST API framework, security headers |
| **Database** | PostgreSQL, Prisma ORM, PG Pool | Persistent relational database and migrations |
| **Authentication**| JWT, bcryptjs | Secure authentication & role-based route protection |
| **AI Integration**| Google Gemini API (`gemini-2.5-flash`) | Chatbot assistant grounding |

---

## 3. Setup & Installation

### Prerequisites
* Node.js v18 or higher
* npm v9 or higher (workspace support is native)
* PostgreSQL 14 or higher

### 1. Install Workspace Dependencies
Run the install command from the root workspace directory. This will automatically install dependencies for both the `frontend` and `backend` subprojects:
```bash
npm install
```

### 2. Configure Environment Variables

Create the `.env` files from their corresponding templates:

**Frontend Setup**:
* **macOS/Linux**: `cp frontend/.env.example frontend/.env`
* **Windows**: `copy frontend\.env.example frontend\.env`

**Backend Setup**:
* **macOS/Linux**: `cp backend/.env.example backend/.env`
* **Windows**: `copy backend\.env.example backend\.env`

#### Environment Variables Breakdown

##### Frontend (`frontend/.env`)
* `VITE_API_URL`: The URL prefix of the Express backend API. Set to `http://localhost:5000/api` for local runs.

##### Backend (`backend/.env`)
* `PORT`: The port number the server runs on (defaults to `5000`).
* `DATABASE_URL`: PostgreSQL connection URL used by Prisma.
* `JWT_SECRET`: Secret key used to sign and verify JSON Web Tokens.
* `JWT_EXPIRES_IN`: Authentication session expiration length (e.g. `7d`).
* `NODE_ENV`: The environment state, set to `development` or `production`.
* `FRONTEND_URL`: React client URL used for CORS validation (defaults to `http://localhost:5173`).
* `GEMINI_API_KEY`: Google Gemini API key required for chatbot response grounding.

### 3. Generate Database Client & Seed Data
Navigate to the `backend/` directory to run migrations and populate initial data (such as airports, flights, and expense categories):
```bash
cd backend
npx prisma generate
npx prisma db push
npm run db:seed
```

---

## 4. Running the Project Locally

You can launch both packages directly from the root repository directory using workspace scripts:

### Start the Frontend Dev Server
```bash
npm run dev:frontend
```
This boots up the Vite React application, typically running at [http://localhost:5173](http://localhost:5173).

### Start the Backend API Server
```bash
npm run dev:backend
```
This runs the Nodemon Express backend server, typically running at [http://localhost:5000](http://localhost:5000).

---

## 5. API Overview

All routes are mounted at the `/api` prefix:

### Authentication
* `POST /api/auth/signup` - Register a new user
* `POST /api/auth/signin` - Authenticate user & retrieve JWT
* `GET /api/auth/me` - Fetch profile of active authenticated user (Protected)

### Travel & Bookings
* `GET /api/flights` - Search flights (Protected)
* `POST /api/bookings` - Create new flight booking (Protected)
* `GET /api/bookings` - View user bookings (Protected)
* `GET /api/trips` - View aggregated trips (Protected)

### Expenses
* `POST /api/expenses` - Log a new travel expense (Protected)
* `GET /api/expenses` - Retrieve logged expenses (Protected)

### Chatbot grounding
* `POST /api/chat` - Queries the chatbot assistant grounded in user context (Protected)
