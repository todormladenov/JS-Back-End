const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('../utils/jwt');
const { SECRET } = require('../config/config');

exports.register = async (userData) => {
    const { username, email, password, rePassword } = userData;
    const isEmpty = Object.values(userData).some(field => field.trim() == '');

    if (isEmpty) {
        throw new Error('All fields are required');
    }

    if (password.length < 4) {
        throw new Error('Password is too short');
    }

    if (password != rePassword) {
        throw new Error('Passwords must match');
    }

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
        throw new Error('Invalid email');
    }

    const hash = await bcrypt.hash(password, 12);

    const user = await User.create({
        username,
        email,
        password: hash
    });

    const token = await jwt.sign({ _id: user._id, email }, SECRET);

    return token;
};

exports.login = async (userData) => {
    const { email, password } = userData;
    const isEmpty = Object.values(userData).some(field => field.trim() == '');

    if (isEmpty) {
        throw new Error('All fields are required');
    }

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