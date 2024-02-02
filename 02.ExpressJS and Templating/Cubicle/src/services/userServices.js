const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('../utils/jwt');
const { SECRET } = require('../config/config');

exports.login = async (email, password) => {
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
};

exports.register = async (email, password, rePassword) => {
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
        throw new Error('Invalid credentials');
    }

    if (password != rePassword) {
        throw new Error('Passwords must match');
    }

    const hash = await bcrypt.hash(password, 12);

    const user = await User.create({ email, password: hash });
    const token = await jwt.sign({ _id: user._id, email: user.email }, SECRET);

    return token;
};