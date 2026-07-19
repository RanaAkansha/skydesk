// src/routes/booking.routes.js
// GET    /api/v1/bookings          — user's bookings
// POST   /api/v1/bookings          — create a booking
// GET    /api/v1/bookings/:id      — single booking detail
// PATCH  /api/v1/bookings/:id/cancel — cancel a booking

import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import * as bookingController from '../controllers/booking.controller.js';
import { createBookingRules, validate } from '../validators/booking.validator.js';

const router = Router();

// All booking routes require authentication
router.use(authenticate);

router.get('/',                  bookingController.getBookings);
router.post('/', createBookingRules, validate, bookingController.createBooking);
router.get('/:id',               bookingController.getBookingById);
router.patch('/:id/cancel',      bookingController.cancelBooking);

export default router;
