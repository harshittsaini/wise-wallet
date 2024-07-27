// client/src/components/ExpenseList.js (update)
import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';

const ExpenseList = ({ expenses, setExpenses }) => {

  const [totalMonthlyExpenses, setTotalMonthlyExpenses] = useState(0);

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

  // Sort expenses by date in descending order
  const sortedExpenses = [...expenses].sort((a, b) => new Date(b.date) - new Date(a.date));

  // Calculate total expenses for the current month
  useEffect(() => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const total = expenses
      .filter(expense => {
        const expenseDate = new Date(expense.date);
        return (
          expenseDate.getMonth() === currentMonth &&
          expenseDate.getFullYear() === currentYear
        );
      })
      .reduce((sum, expense) => sum + expense.amount, 0);

    setTotalMonthlyExpenses(total);
  }, [expenses]);

  return (
    <div className='mt-8'>
      <div>
        <h3 className='m-5 text-gray-200 font-semibold font-mono'>Total Expenses for This Month: ₹{totalMonthlyExpenses.toFixed(2)}</h3>
      </div>
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
          {sortedExpenses.map(expense => (
            <tr key={expense._id}>
              <td>{expense.description}</td>
              <td>₹{expense.amount}</td>
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
