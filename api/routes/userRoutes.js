const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authenticateUser = require('../middleware/AuthenticateUser');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.post('/user', authenticateUser, asyncHandler(async (req, res, next) => {
    try {
        const [ user ] = await User.findAll({
            where: {
                email: req.body.email
            }
        });
        res.status(200).json(user);
    } catch(err) {
        next(err);
    }
}));

router.post('/user/create', asyncHandler(async (req, res, next) => {
    try {
        const hashedPass = await bcrypt.hash(req.body.password, saltRounds);
        req.body.password = hashedPass;
        const newUser = await User.create(req.body);
        res.status(201).json(newUser);
    } catch (err) {
        next(err);
    }
}));

module.exports = router;