// client/src/components/ExpenseForm.js
import React, { useState } from 'react';
import axios from '../utils/axios';

const ExpenseForm = ({ addExpense }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [date, setDate] = useState(new Date().toISOString().substring(0, 10)); // Default to today


  const onSubmit = async (e) => {
    e.preventDefault();
    
    const res = await axios.post('/expenses', { description, amount, paymentMethod, date });
    addExpense(res.data);
    setDescription('');
    setAmount('');
    setPaymentMethod('Cash');
    setDate('');
  };

  return (
    <form onSubmit={onSubmit} className='mt-6'>
      <div className='m-3' >
        <label>Description: </label>
        <input className='py-2 px-2 mb-[12px]'
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className='m-3'>
        <label>Amount: </label>
        <input className='py-2 px-2 mb-[12px]'
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div className='m-3'>
        <label>Payment Method: </label>
        <select className='py-2 px-2 mb-[12px]'
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          required
        >
          <option value="Cash">Cash</option>
          <option value="Card">Card</option>
          <option value="UPI">UPI</option>
        </select>
      </div>
      <div className='m-3'>
        <label>Date: </label>
        <input className='py-2 px-2 mb-[12px]'
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>

      <button type="submit">Add Expense</button>

    </form>
  );
};

export default ExpenseForm;
