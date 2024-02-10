const jwt = require('../utils/jwt');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const { SECRET } = require('../config/config');

exports.register = async ({ username, email, password, rePassword }) => {
    const existingUser = await User.findOne({ $or: [{ email: email }, { username: username }] });

    if (existingUser) {
        throw new Error('Email already exists');
    }

    if (password.length < 4) {
        throw new Error('Password is too short');
    }

    if (password != rePassword) {
        throw new Error('Passwords must match');
    }

    const hash = await bcrypt.hash(password, 12);
    const user = await User.create({ username, email, password: hash });
    const payload = {
        _id: user._id,
        email: user._id
    }

    const token = await jwt.sign(payload, SECRET);

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

    const payload = {
        _id: user._id,
        email: user._id
    }

    const token = await jwt.sign(payload, SECRET);

    return token;
};

exports.getAllCourses = (userId) => User.findById(userId).populate('ownCourses').populate('signUpCourses');