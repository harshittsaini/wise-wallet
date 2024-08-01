import { useUser, UserButton } from "@clerk/clerk-react";
import React, { useState, useEffect } from 'react';
import ExpenseList from '../components/ExpenseList';
import ExpenseForm from '../components/ExpenseForm';
import axios from '../utils/axios';
import ExpenseGraph from "../components/ExpenseGraph";

const Dashboard = () => {

    const { user } = useUser();

    const [expenses, setExpenses] = useState([]);
    const [showGraph, setShowGraph] = useState(false);

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
    <div >
      <h2 className="font-semibold font-serif">Wise Wallet</h2>
      <h1> Welcome {user?.firstName}! Here Are Your Finances:</h1>
      <div className=" absolute flex gap-3 m-3">
        <UserButton />
        <p>User Account</p>
      </div>
      <ExpenseForm addExpense={addExpense} />
      <ExpenseList expenses={expenses} setExpenses={setExpenses} />
      <div className="mt-4">
        <button className="m-5" onClick={() => setShowGraph(!showGraph)}>
          {showGraph ? 'Hide Monthly Expenses' : 'Show Monthly Expenses'}
        </button>
        {showGraph && <ExpenseGraph />}
      </div>
    </div>
  )
}

export default Dashboard