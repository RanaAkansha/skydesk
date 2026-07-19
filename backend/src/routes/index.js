// src/routes/index.js
// Aggregates all route modules into a single versioned router.
// Mounted at /api/v1 in app.js.
//
// Adding a new resource:
//   1. Create src/routes/newresource.routes.js
//   2. Import it here
//   3. Add: router.use('/newresources', newResourceRoutes);

import { Router } from 'express';
import authRoutes    from './auth.routes.js';
import flightRoutes  from './flight.routes.js';
import bookingRoutes from './booking.routes.js';
import tripRoutes    from './trip.routes.js';
import expenseRoutes from './expense.routes.js';
import offerRoutes   from './offer.routes.js';
import supportRoutes from './support.routes.js';

const router = Router();

router.use('/auth',     authRoutes);
router.use('/flights',  flightRoutes);
router.use('/bookings', bookingRoutes);
router.use('/trips',    tripRoutes);
router.use('/expenses', expenseRoutes);
router.use('/offers',   offerRoutes);
router.use('/support',  supportRoutes);

export default router;
