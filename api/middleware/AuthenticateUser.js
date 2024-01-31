const bcrypt = require('bcrypt');
const auth = require('basic-auth');
const User = require('../models/User');

const AuthenticateUser = async (req, res, next) => {
    try {
        const user = auth(req);
        const [ getUser ] = await User.findAll({
            where: {
                email: user.name
            }
        });
        res.locals.id = getUser.dataValues.id;
        const result = await bcrypt.compare(user.pass, getUser.dataValues.password);
        if (result) {
            next();
        } else {
            res.status(403).json({ Error: 'Invalid Credentials' });
        }
    } catch (err) {
        next(err);
    }
}

module.exports = AuthenticateUser;

