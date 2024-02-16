const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('../utils/jwt');
const { SECRET } = require('../config/config');

exports.register = async ({ username, email, password, rePassword }) => {
    if (password.length < 4 || password.trim() == '') {
        throw new Error('Invalid password');
    }

    if (password != rePassword) {
        throw new Error('Passwords must match');
    }

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
        throw new Error('Invalid email');
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({ username, email, password: hash });
    const token = await jwt.sign({ _id: user._id, email: user.email }, SECRET);

    return token;
};

exports.login = async ({ email, password }) => {
    const user = await User.findOne({ email: email });

    if (!user) {
        throw new Error('Email or password don\'t match');
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw new Error('Email or password don\'t match');
    }

    const token = await jwt.sign({ _id: user._id, email: user.email }, SECRET);

    return token;
}