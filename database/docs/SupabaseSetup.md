# SkyDesk Supabase Setup Guide

## Database

PostgreSQL

Hosted on Supabase

---

## Project Information

Project Name:

SkyDesk

Project URL:

(To be added)

Project ID:

(To be added)

Region:

(To be added)

---

## Environment Variables

DATABASE_URL=

DIRECT_URL=

SUPABASE_URL=

SUPABASE_ANON_KEY=

SUPABASE_SERVICE_ROLE_KEY=

---

## Prisma

Provider:

postgresql

Datasource:

DATABASE_URL

---

## Backend Usage

Express Server

Prisma Client

JWT Authentication

---

## Security Rules

Never commit:

- .env
- DATABASE_URL
- DIRECT_URL
- SERVICE_ROLE_KEY

Only commit:

.env.example

---

## Team Members

Database

Saroj

Backend

Akansha
Gautam

Authentication

Ayush

---

## Connection Flow

Frontend (React)

↓

Express API

↓

Prisma ORM

↓

PostgreSQL (Supabase)