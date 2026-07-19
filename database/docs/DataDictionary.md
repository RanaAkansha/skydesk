# SkyDesk Data Dictionary

## users

| Column | Type | Description |
|---------|------|-------------|
| id | UUID | Primary key |
| full_name | String | User full name |
| email | String | Unique email |
| password | String | Hashed password |
| phone | String | Contact number |
| profile_image | String | Profile image URL |
| created_at | Timestamp | Record creation time |
| updated_at | Timestamp | Last update time |

---

## trips

| Column | Type | Description |
|---------|------|-------------|
| id | UUID | Primary key |
| user_id | UUID | Owner of trip |
| title | String | Trip title |
| from_city | String | Departure city |
| from_code | String | Airport code |
| to_city | String | Destination city |
| to_code | String | Airport code |
| start_date | Date | Trip start |
| end_date | Date | Trip end |
| status | Enum | Planned/Ongoing/Completed/Cancelled |
| total_budget | Decimal | Total budget |
| created_at | Timestamp | Created time |
| updated_at | Timestamp | Updated time |

---

## flights

| Column | Type | Description |
|---------|------|-------------|
| id | UUID | Primary key |
| airline | String | Airline name |
| airline_code | String | Airline code |
| flight_number | String | Flight number |
| logo | String | Airline logo URL |
| from_city | String | Source city |
| from_code | String | Source airport |
| to_city | String | Destination city |
| to_code | String | Destination airport |
| departure_time | DateTime | Departure |
| arrival_time | DateTime | Arrival |
| duration | String | Flight duration |
| terminal | String | Terminal |
| gate | String | Boarding gate |
| travel_class | Enum | Economy/Business/etc. |
| base_price | Decimal | Ticket price |

---

## bookings

| Column | Type | Description |
|---------|------|-------------|
| id | UUID | Primary key |
| booking_code | String | Booking reference |
| trip_id | UUID | Linked trip |
| flight_id | UUID | Linked flight |
| passengers | Integer | Passenger count |
| seat_number | String | Seat allocation |
| booking_status | Enum | Booking status |
| booking_date | DateTime | Booking date |
| total_price | Decimal | Final amount |

---

## expense_categories

| Column | Type | Description |
|---------|------|-------------|
| id | UUID | Primary key |
| name | String | Category name |
| description | String | Category description |

---

## expenses

| Column | Type | Description |
|---------|------|-------------|
| id | UUID | Primary key |
| trip_id | UUID | Linked trip |
| category_id | UUID | Expense category |
| title | String | Expense title |
| description | String | Expense details |
| amount | Decimal | Expense amount |
| expense_date | Date | Date |
| receipt_url | String | Receipt image |