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

router.post('/expense/:id', authenticateUser, asyncHandler(async (req, res) => {
    try {
        const expense = await Expense.findOne({
            where: {
                id: req.params.id,
                ownerId: res.locals.id
            }
        });
        if (expense === null) {
            res.status(403).json({ error: "User not authorized to view this page."})
        }
        res.status(200).json(expense);
    } catch (err) {
        next(err);
    }
}));

router.patch('/expense/:id', authenticateUser, asyncHandler(async (req, res) => {
    try {
        const expense = await Expense.findOne({
            where: {
                id: req.params.id,
                ownerId: res.locals.id
            }
        });
        if (expense === null) {
            res.status(403).json({ error: "User not authorized to change this record."})
        }
        const updated = await expense.update(req.body);
        res.status(200).json(updated);
    } catch (err) {
        next(err);
    }
}));

router.delete('/expense/:id', authenticateUser, asyncHandler(async (req, res) => {
    try {
        const expense = await Expense.findOne({
            where: {
                id: req.params.id,
                ownerId: res.locals.id
            }
        });
        if (expense === null) {
            res.status(403).json({ error: "User not authorized to delete this record."})
        }
        await expense.destroy();
        res.status(200).end();
    } catch (err) {
        next(err);
    }
}));

module.exports = router;