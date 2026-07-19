// src/routes/expense.routes.js
// GET  /api/v1/expenses      — user's expenses (filterable: ?category=&status=&trip_id=)
// POST /api/v1/expenses      — create expense
// GET  /api/v1/expenses/:id  — single expense

import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import * as expenseController from '../controllers/expense.controller.js';
import { createExpenseRules, validate } from '../validators/expense.validator.js';

const router = Router();

router.use(authenticate);

router.get('/',    expenseController.getExpenses);
router.post('/',   createExpenseRules, validate, expenseController.createExpense);
router.get('/:id', expenseController.getExpenseById);

export default router;
