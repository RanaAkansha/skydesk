# SkyDesk ER Diagram

```text
                    USERS
                  ----------
                  id (PK)
                     │
                     │ 1
                     │
                     ▼
                    TRIPS
                  ----------
                  id (PK)
                  user_id (FK)
                     │
        ┌────────────┴────────────┐
        │                         │
      1:N                       1:N
        │                         │
        ▼                         ▼
    BOOKINGS                  EXPENSES
   -----------              -------------
   id (PK)                  id (PK)
   trip_id (FK)             trip_id (FK)
   flight_id (FK)           category_id (FK)
        │                         │
        ▼                         ▼
     FLIGHTS           EXPENSE_CATEGORIES
   -----------         ------------------
   id (PK)             id (PK)
```