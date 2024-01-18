const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const saltRounds = 10;

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
            res.status(200).json(user);
        }
    } catch(err) {
        console.error(err);
        res.status(400).json({ message: 'Invalid Credentials' });
    }
}));

router.post('/users/newuser', asyncHandler(async (req, res) => {
    try {
        const hashedPass = await bcrypt.hash(req.body.password, saltRounds);
        req.body.password = hashedPass;
        console.log(req.body);
        const newUser = await User.create(req.body);
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json(err);
    }
}));

module.exports = router;