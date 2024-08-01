// client/src/components/ExpenseGraph.js
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from '../utils/axios';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register required components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


const ExpenseGraph = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchMonthlyExpenses = async () => {
      try {
        const response = await axios.get('/expenses/monthly');
        const data = response.data;

        const months = [
          'January', 'February', 'March', 'April', 'May', 'June', 
          'July', 'August', 'September', 'October', 'November', 'December'
        ];

        const labels = data.map(entry => `${months[entry._id.month - 1]} ${entry._id.year}`);

        const chartData = {
          labels: labels,
          datasets: [
            {
              label: 'Monthly Expenses',
              data: data.map(entry => entry.totalAmount),
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
              fill: false,
            }
          ]
        };

        setChartData(chartData);
      } catch (error) {
        console.error('Error fetching monthly expenses:', error);
      }
    };

    fetchMonthlyExpenses();
  }, []);

  return (
    <div>
      <h2>Monthly Expenses</h2>
      {chartData ? <Bar data={chartData} /> : <p>Loading data...</p>}
    </div>
  );
};

export default ExpenseGraph;
