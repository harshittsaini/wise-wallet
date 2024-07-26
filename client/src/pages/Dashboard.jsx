import { useUser, UserButton } from "@clerk/clerk-react";
import React, { useState, useEffect } from 'react';
import ExpenseList from '../components/ExpenseList';
import ExpenseForm from '../components/ExpenseForm';
import axios from '../utils/axios';

const Dashboard = () => {

    const { user } = useUser();

    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        const fetchExpenses = async () => {
        const res = await axios.get('/expenses');
        setExpenses(res.data);
        };
        fetchExpenses();
    }, []);

    const addExpense = (expense) => {
        setExpenses([...expenses, expense]);
    };

  return (
    <div className="dashboard-container">
      <h1> Welcome {user?.firstName}! Here Are Your Finances:</h1>
      <UserButton />

      <h1>Expense Tracker</h1>
      <ExpenseForm addExpense={addExpense} />
      <ExpenseList expenses={expenses} setExpenses={setExpenses} />
    </div>
  )
}

export default Dashboard