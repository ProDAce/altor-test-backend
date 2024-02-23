const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');
const deviceRouter = require('./routes/device')

// Initilize express app
const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json({ extended: false }));

// Routes
app.use('/api/device', deviceRouter)

// Start server
app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
});

