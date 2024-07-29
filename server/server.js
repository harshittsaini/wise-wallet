// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        //listen for request
        app.listen(process.env.PORT, ()=>{
            console.log('connected to db and listening to port ', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })

// Routes
const expensesRoute = require('./routes/expenses');
app.use('/api/expenses', expensesRoute);

const stockRoutes = require('./routes/stockRoutes');
app.use('/api/stocks', stockRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// console.log('Clerk API Key:', process.env.CLERK_API_KEY);
// console.log('Mongo URI:', process.env.MONGO_URI);

