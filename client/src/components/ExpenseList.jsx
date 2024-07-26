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
    <div>
      <h2>Expense List</h2>
      <ul>
        {expenses.map(expense => (
          <li key={expense._id}>
            {expense.description}: ${expense.amount}
            <button onClick={() => deleteExpense(expense._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
