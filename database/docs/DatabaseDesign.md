# SkyDesk Database Standards

## Database
PostgreSQL

## ORM
Prisma

## Hosting
Supabase

## Primary Key
UUID

## Naming Convention

Tables: snake_case

Columns: snake_case

Primary Key:
id

Foreign Key:
user_id
trip_id
flight_id
category_id

Timestamps:
created_at
updated_at

Soft Delete:
Not implemented (Phase 1)

# Users

Purpose:
Stores registered users of SkyDesk.

Columns

- id (UUID, Primary Key)
- full_name
- email (Unique)
- password (Hashed)
- phone
- profile_image
- created_at
- updated_at

# Trips

Purpose:
Stores each travel plan created by a user.

Columns

- id
- user_id
- title
- from_city
- from_code
- to_city
- to_code
- start_date
- end_date
- status
- total_budget
- created_at
- updated_at

# Flights

Purpose:
Stores flight information.

Columns

- id
- airline
- airline_code
- flight_number
- logo
- from_city
- from_code
- to_city
- to_code
- departure_time
- arrival_time
- duration
- travel_class
- terminal
- gate

# SkyDesk Database Design

## Project

SkyDesk – Intelligent Flight Booking & Expense Management System

---

# Database Information

Database : PostgreSQL

ORM : Prisma

Hosting : Supabase

Primary Key : UUID

Naming Convention : snake_case

---

# Relationships

User (1) ------ (N) Trip

Trip (1) ------ (N) Booking

Flight (1) ---- (N) Booking

Trip (1) ------ (N) Expense

Expense Category (1) ---- (N) Expense

---

# Table 1 : users

## Purpose

Stores all registered users.

| Column | Type | Constraint |
|----------|------|------------|
| id | UUID | Primary Key |
| full_name | VARCHAR(100) | Required |
| email | VARCHAR(100) | Unique |
| password | TEXT | Hashed Password |
| phone | VARCHAR(20) | Optional |
| profile_image | TEXT | Optional |
| created_at | Timestamp | Default Now |
| updated_at | Timestamp | Auto Update |

---

# Table 2 : trips

## Purpose

Stores each trip created by a user.

| Column | Type | Constraint |
|----------|------|------------|
| id | UUID | Primary Key |
| user_id | UUID | Foreign Key |
| title | VARCHAR(100) | Required |
| from_city | VARCHAR(50) | Required |
| from_code | VARCHAR(10) | Required |
| to_city | VARCHAR(50) | Required |
| to_code | VARCHAR(10) | Required |
| start_date | DATE | Required |
| end_date | DATE | Required |
| status | ENUM | Planned / Ongoing / Completed / Cancelled |
| total_budget | DECIMAL(10,2) | Optional |
| created_at | Timestamp | Default Now |
| updated_at | Timestamp | Auto Update |

---

# Table 3 : flights

## Purpose

Stores available flight information.

| Column | Type | Constraint |
|----------|------|------------|
| id | UUID | Primary Key |
| airline | VARCHAR(50) | Required |
| airline_code | VARCHAR(10) | Required |
| flight_number | VARCHAR(20) | Required |
| logo | TEXT | Optional |
| from_city | VARCHAR(50) | Required |
| from_code | VARCHAR(10) | Required |
| to_city | VARCHAR(50) | Required |
| to_code | VARCHAR(10) | Required |
| departure_time | TIME | Required |
| arrival_time | TIME | Required |
| duration | VARCHAR(20) | Required |
| terminal | VARCHAR(20) | Optional |
| gate | VARCHAR(20) | Optional |
| travel_class | ENUM | Economy / Business |

---

# Table 4 : bookings

## Purpose

Stores every flight booking.

| Column | Type | Constraint |
|----------|------|------------|
| id | UUID | Primary Key |
| booking_code | VARCHAR(30) | Unique |
| trip_id | UUID | Foreign Key |
| flight_id | UUID | Foreign Key |
| passengers | INTEGER | Required |
| seat_number | VARCHAR(20) | Optional |
| booking_status | ENUM | Confirmed / Cancelled / Completed |
| booking_date | DATE | Required |
| total_price | DECIMAL(10,2) | Required |
| created_at | Timestamp | Default Now |

---

# Table 5 : expense_categories

## Purpose

Master list of expense categories.

| Column | Type | Constraint |
|----------|------|------------|
| id | UUID | Primary Key |
| name | VARCHAR(50) | Unique |
| description | TEXT | Optional |
| created_at | Timestamp | Default Now |

---

# Table 6 : expenses

## Purpose

Stores all expenses made during a trip.

| Column | Type | Constraint |
|----------|------|------------|
| id | UUID | Primary Key |
| trip_id | UUID | Foreign Key |
| category_id | UUID | Foreign Key |
| title | VARCHAR(100) | Required |
| description | TEXT | Optional |
| amount | DECIMAL(10,2) | Required |
| expense_date | DATE | Required |
| receipt_url | TEXT | Optional |
| created_at | Timestamp | Default Now |

---

# Enums

## Trip Status

- PLANNED
- ONGOING
- COMPLETED
- CANCELLED

---

## Booking Status

- CONFIRMED
- CANCELLED
- COMPLETED

---

## Travel Class

- ECONOMY
- BUSINESS

---

# Indexes

users.email

bookings.booking_code

expenses.trip_id

bookings.trip_id

bookings.flight_id

---

# Future Expansion

The following modules can be added later without changing the existing database design:

- Hotels
- Visa Management
- Travel Insurance
- Corporate Approval Workflow
- Payment Gateway
- Notifications
- Offers
- Destinations