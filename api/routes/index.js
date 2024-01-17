const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const User = require('../models/User');

router.get('/', (req, res) => {
    res.send('Root Route');
});

router.get('/users', asyncHandler(async (req, res) => {
    try {
        const allUsers = await User.findAll();
        res.status(200).json(allUsers);
    } catch (err) {
        console.error(err);
    }
}));

router.post('/users', asyncHandler(async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.status(201).json(newUser);
    } catch (err) {
        console.error(err);
    }
}));

module.exports = router;