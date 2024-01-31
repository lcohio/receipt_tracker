'use strict';
const express = require('express');
const sequelize = require('./database');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes.js');
const expenseRoutes = require('./routes/expenseRoutes.js');
const morgan = require('morgan');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(morgan('combined'));

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the REST API' });
});

app.use('/api', userRoutes);
app.use('/api', expenseRoutes);

app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
    res.status(err.status || 500).json({ message: err.message });
});

sequelize.sync().then(() => console.log('DB initialized'));

app.listen(5000, () => {
    console.log('App is running on port 5000');
});