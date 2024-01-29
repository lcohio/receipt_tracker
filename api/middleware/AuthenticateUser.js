const bcrypt = require('bcrypt');
const auth = require('basic-auth');
const User = require('../models/User');

const AuthenticateUser = async (req, res, next) => {
    const user = auth(req);
    const [ getEntry ] = await User.findAll({
        where: {
            email: user.name
        }
    });
    const result = await bcrypt.compare(user.pass, getEntry.dataValues.password);
    if (result) {
        next();
    } else {
        res.status(403).json({ Error: 'Invalid Credentials' });
    }
}

module.exports = AuthenticateUser;

