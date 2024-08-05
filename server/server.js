// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const app = express();
dotenv.config();
const port = process.env.PORT || 5010;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log('connected to db and listening to port ', port)
    })
    .catch((error) => {
        console.log(error)
    })

// Routes
const expensesRoute = require('./routes/expenses');
app.use('/api/expenses', expensesRoute);

app.get('/', (req, res) => {
    res.json('hello this is live')
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

