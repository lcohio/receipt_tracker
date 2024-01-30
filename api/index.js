const express = require('express');
const sequelize = require('./database');
const cors = require('cors');
const app = express();
const routes = require('./routes/index');
const morgan = require('morgan');
const dotenv = require('dotenv');
dotenv.config();
app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(morgan('combined'));


app.use('/', routes);

sequelize.sync().then(() => console.log('DB is ready'));

app.listen(5000, () => {
    console.log('App is running on port 5000');
});