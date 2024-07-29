// server/routes/stockRoutes.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

const ALPHA_VANTAGE_API_KEY = process.env.ALPHA_VANTAGE_API_KEY;

// Route to get stock price
router.get('/:symbol', async (req, res) => {
  const { symbol } = req.params;
  try {
    const response = await axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`);
    const stockData = response.data['Global Quote'];
    if (!stockData || !stockData['01. symbol']) {
      return res.status(404).json({ message: 'Stock data not found' });
    }
    res.json({
      symbol: stockData['01. symbol'],
      price: parseFloat(stockData['05. price']).toFixed(2),
      date: stockData['07. latest trading day'],
      changePercent: stockData ['10. change percent']
    });
  } catch (error) {
    console.error(error.response ? error.response.data : error.message); // Enhanced error logging
    res.status(500).json({ message: 'Error fetching stock data' });
  }
});

module.exports = router;
