# SkyDesk API ↔ Database Mapping

## Authentication

### POST /auth/signup

Table:
- users

Operation:
- INSERT

JWT:
- No

---

### POST /auth/login

Table:
- users

Operation:
- SELECT

JWT:
- No

---

### GET /users/me

Table:
- users

Operation:
- SELECT

JWT:
- Yes

---

## Trips

### GET /trips

Table:
- trips

Operation:
- SELECT

JWT:
- Yes

---

### POST /trips

Table:
- trips

Operation:
- INSERT

JWT:
- Yes

---

### PUT /trips/:id

Table:
- trips

Operation:
- UPDATE

JWT:
- Yes

---

### DELETE /trips/:id

Table:
- trips

Operation:
- DELETE

JWT:
- Yes

---

## Flights

### GET /flights

Table:
- flights

Operation:
- SELECT

JWT:
- Optional

---

### GET /flights/:id

Table:
- flights

Operation:
- SELECT

JWT:
- Optional

---

## Bookings

### GET /bookings

Tables:
- bookings
- flights
- trips

Operation:
- SELECT

JWT:
- Yes

---

### POST /bookings

Tables:
- bookings
- flights
- trips

Operation:
- INSERT

JWT:
- Yes

---

### PUT /bookings/:id

Table:
- bookings

Operation:
- UPDATE

JWT:
- Yes

---

### DELETE /bookings/:id

Table:
- bookings

Operation:
- DELETE

JWT:
- Yes

---

## Expenses

### GET /expenses

Tables:
- expenses
- expense_categories

Operation:
- SELECT

JWT:
- Yes

---

### POST /expenses

Table:
- expenses

Operation:
- INSERT

JWT:
- Yes

---

### PUT /expenses/:id

Table:
- expenses

Operation:
- UPDATE

JWT:
- Yes

---

### DELETE /expenses/:id

Table:
- expenses

Operation:
- DELETE

JWT:
- Yes