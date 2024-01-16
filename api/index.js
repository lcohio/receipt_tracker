const express = require('express');
const sequelize = require('./database');
const app = express();
const routes = require('./routes/index');
app.use(express.json());

app.use('/', routes);

sequelize.sync().then(() => console.log('DB is ready'));

app.listen(5000, () => {
    console.log('App is running on port 5000');
});