const User = require('../models/User');
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('../utils/jwt');
const { SECRET } = require('../config/config');

exports.register = async (userData) => {
    const existingUser = await User.findOne({$or: [{email: userData.email}, {username: userData.username}]});

    if (!validator.isEmail(userData.email)) {
        throw new Error('Invalid email format');
    }

    if (existingUser) {
        throw new Error('Invalid email or username');
    }

    if (userData.password != userData.rePassword) {
        throw new Error('Passwords must match');
    }

    if (userData.password == '') {
        throw new Error('Passwords is required');

    }

    const hash = await bcrypt.hash(userData.password, 12);
    const user = await User.create({
        email: userData.email,
        username: userData.username,
        password: hash
    });

    const token = await jwt.sign({_id: user._id, username: user.username}, SECRET);
    return token;
};