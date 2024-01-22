const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');
const User = require('./User');

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

Expense.associate = (models) => {
    Expense.belongsTo(models.User, {
        allowNull: false
    });
}

module.exports = Expense;