// server/routes/expenses.js
const express = require('express');
const router = express.Router();
const expensesController = require('../controllers/expenseController');

router.get('/', expensesController.getExpenses);
router.post('/', expensesController.addExpense);
router.delete('/:id', expensesController.deleteExpense);

module.exports = router;
