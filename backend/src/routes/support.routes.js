// src/routes/support.routes.js
// GET  /api/v1/support — list user's support tickets
// POST /api/v1/support — create a support ticket

import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import * as supportController from '../controllers/support.controller.js';
import { createTicketRules, validate } from '../validators/support.validator.js';

const router = Router();

router.use(authenticate);

router.get('/',  supportController.getTickets);
router.post('/', createTicketRules, validate, supportController.createTicket);

export default router;
