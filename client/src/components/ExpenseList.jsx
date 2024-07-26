// client/src/components/ExpenseList.js (update)
import React, { useEffect } from 'react';
import axios from '../utils/axios';

const ExpenseList = ({ expenses, setExpenses }) => {
  useEffect(() => {
    const fetchExpenses = async () => {
      const res = await axios.get('/expenses');
      setExpenses(res.data);
    };
    fetchExpenses();
  }, [setExpenses]);

  const deleteExpense = async (id) => {
    await axios.delete(`/expenses/${id}`);
    setExpenses(expenses.filter(expense => expense._id !== id));
  };

  return (
    <div className='mt-8'>
      <table className=' w-full border-collapse'>
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
            <th>Payment Method</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map(expense => (
            <tr key={expense._id}>
              <td>{expense.description}</td>
              <td>${expense.amount}</td>
              <td>{expense.paymentMethod}</td>
              <td>{new Date(expense.date).toLocaleDateString()}</td>
              <td>
                <button onClick={() => deleteExpense(expense._id)} className='m-2'>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseList;
