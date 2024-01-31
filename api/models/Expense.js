const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');

class Expense extends Model {}

Expense.init({
    vendor: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    amount: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ownerId: {   
        type: DataTypes.STRING,
        allowNull: false
    }
}, { sequelize,
     modelName: 'expense'
});

module.exports = Expense;