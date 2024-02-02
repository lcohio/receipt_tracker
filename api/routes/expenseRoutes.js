const express = require('express');
const Expense = require('../models/Expense');
const asyncHandler = require('express-async-handler');
const authenticateUser = require('../middleware/AuthenticateUser');
const router = express.Router();

router.post('/expense/create', authenticateUser, asyncHandler(async (req, res) => {
    try {
        const newExpenseData = req.body;
        newExpenseData.ownerId = res.locals.id;
        const newExpense = await Expense.create(newExpenseData);
        res.status(201).json(newExpense);
    } catch (err) {
        res.status(400).json({ error: 'User Credentials Invalid', err });
    }
}));

router.post('/expenses', authenticateUser, asyncHandler(async (req, res) => {
    try {
        const expenses = await Expense.findAll({
            where: {
                ownerId: res.locals.id
            }
        });
        res.status(200).json(expenses);
    } catch (err) {
        console.error(err);
    }
}));

router.patch('/expenses/:id', authenticateUser, asyncHandler(async (req, res) => {
    try {
        const [expense] = await Expense.findOne({
            where: {
                id: req.params.id
            }
        });
        console.log(expense);
    } catch (err) {
        next(err);
    }
}));

module.exports = router;