const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');
const Expense = require('./Expense');

class User extends Model {}

User.init({
    fullName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    sequelize,
    modelName: 'user'
});

User.associate = () => {
    User.hasMany(Expense, {
        foreignKey: 'userId',
        allowNull: false
    });  
}

module.exports = User;