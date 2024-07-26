// client/src/components/ExpenseForm.js
import React, { useState } from 'react';
import axios from '../utils/axios';

const ExpenseForm = ({ addExpense }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post('/expenses', { description, amount });
    addExpense(res.data);
    setDescription('');
    setAmount('');
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label>Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <button type="submit">Add Expense</button>
    </form>
  );
};

export default ExpenseForm;
