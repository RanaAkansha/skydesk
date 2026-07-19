// src/routes/offer.routes.js
// GET /api/v1/offers — active offers (public — no auth required)

import { Router } from 'express';
import * as offerController from '../controllers/offer.controller.js';

const router = Router();

// Offers are intentionally public so the homepage can display them
// without requiring a login. Add `authenticate` here if that changes.
router.get('/', offerController.getOffers);

export default router;
