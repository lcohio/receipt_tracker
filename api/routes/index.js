const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const User = require('../models/User');

router.get('/', (req, res) => {
    res.send('Root Route');
});

router.get('/users', (req, res) => {
    res.send('users route');
    console.log('users route');
});

router.post('/users', asyncHandler(async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.status(201).json(newUser);
    } catch (err) {
        console.error(err);
    }
}));

module.exports = router;