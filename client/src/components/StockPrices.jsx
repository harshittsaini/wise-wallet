// client/src/components/StockPrices.js
import React, { useState } from 'react';
import axios from '../utils/axios';

const StockPrices = () => {
  const [symbol, setSymbol] = useState('');
  const [stock, setStock] = useState(null);
  const [error, setError] = useState('');

  const fetchStockPrice = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`/stocks/${symbol}`);
      setStock(res.data);
      setError('');
    } catch (err) {
      setError('Error fetching stock data. Please check the stock symbol.');
      setStock(null);
    }
  };

  return (
    <div className='mt-5'>
      <h2 className='font-bold'>Stock Prices</h2>
      <form onSubmit={fetchStockPrice}>
        <input className='p-0.5 pl-2'
          type="text"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          placeholder="Enter stock symbol (like IBM, AAPL, GOOGL)"
          required
        />
        <button type="submit" className='ml-5'>Get Price</button>
      </form>
      {error && <p>{error}</p>}
      {stock && (
          <div className='flex flex-col justify-center items-center'>
            <div>
                <h3 className='m-4 mt-3 font-serif font-semibold'>Stock Information</h3>
            </div>
            <div className='stock-card'>
                <p className='stock-header stock-name'> {stock.symbol}</p>
                <p className='stock-info stock-price text-black'> ${stock.price}</p>
                <p className={`stock-change ${stock.changePercent.startsWith('-') ? 'negative' : 'positive'}`}> {stock.changePercent}</p>
                <p className='stock-footer'> {stock.date}</p>
            </div>
        </div>
      )}
    </div>
  );
};

export default StockPrices;
