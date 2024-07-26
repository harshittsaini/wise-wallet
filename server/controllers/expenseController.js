// server/controllers/expensesController.js
const Expense = require('../models/expense');

exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addExpense = async (req, res) => {
  const { description, amount } = req.body;
  try {
    const newExpense = new Expense({ description, amount });
    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteExpense = async (req, res) => {
    try {
        const expense = await Expense.findById(req.params.id);
        if (!expense) {
          return res.status(404).json({ message: 'Expense not found' });
        }
        await Expense.deleteOne({ _id: req.params.id });
        res.json({ message: 'Expense removed' });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
};
