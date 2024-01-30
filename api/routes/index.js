const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const Expense = require('../models/Expense');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;


const generateToken = (username) => {
    return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}

const authenticateToken = (req, res, next) => {
    const authHeader = req.header('authorization');
    const secret = process.env.TOKEN_SECRET;
    try {
        jwt.verify(authHeader, secret);
        next();
    } catch (err) {
        res.status(401).json(err);
    }
}

router.get('/', (req, res) => {
    res.send('Root Route');
});

router.post('/users', asyncHandler(async (req, res) => {
    try {
        const [ user ] = await User.findAll({
            where: {
                email: req.body.email
            }
        });
        const isAuthenticated = await bcrypt.compare(req.body.password, user.dataValues.password);
        if(isAuthenticated) {
            const token = generateToken({ username: user.dataValues.email });
            res.status(200).json({
                user,
                token
            });
        }
    } catch(err) {
        console.error(err);
        res.status(400).json({ message: 'Invalid Credentials' });
    }
}));

router.post('/users/create', asyncHandler(async (req, res) => {
    try {
        const hashedPass = await bcrypt.hash(req.body.password, saltRounds);
        req.body.password = hashedPass;
        const newUser = await User.create(req.body);
        const token = generateToken({ username: newUser.email });
        res.status(201).json({
            newUser,
            token
        });
    } catch (err) {
        res.status(400).json(err);
    }
}));

router.post('/expense/create', authenticateToken, asyncHandler(async (req, res) => {
    try {
        const newExpenseData = req.body;
        const newExpense = await Expense.create(newExpenseData);
        res.status(201).json(newExpense);
    } catch (err) {
        res.status(400).json({ error: 'User Credentials Invalid', err });
    }
}));

router.post('/expenses', authenticateToken, asyncHandler(async (req, res) => {
    try {
        const expenses = await Expense.findAll({
            where: {
                ownerId: req.body.ownerId
            }
        });
        res.status(200).json(expenses);
    } catch (err) {
        console.error(err);
    }
}));

router.patch('/expenses/:id', asyncHandler(async (req, res) => {
    try {
        const [expense] = await Expense.findAll({
            where: {
                id: req.params.id
            }
        });
        console.log(expense);
    } catch (err) {

    }
}));

router.delete('/expenses/:id', (req, res) => {

});

module.exports = router;