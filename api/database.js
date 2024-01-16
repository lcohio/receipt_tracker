const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('expenses', 'user', 'pass', {
    dialect: 'sqlite',
    host: './dev.sqlite'
});

module.exports = sequelize;