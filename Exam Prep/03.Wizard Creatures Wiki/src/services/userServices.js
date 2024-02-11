const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('../utils/jwt');
const { SECRET } = require('../config/config');

exports.register = async (userData) => {
    const isEmpty = Object.values(userData).some(field => field == '');

    if (isEmpty) {
        throw new Error('All fields are required');
    }

    const existingUser = await User.findOne({ email: userData.email });

    if (existingUser) {
        throw new Error('Invalid email');
    }


    if (userData.password != userData.rePassword) {
        throw new Error('Passwords must match');
    }

    const hash = await bcrypt.hash(userData.password, 10);
    const user = await User.create({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: hash
    });

    const token = await jwt.sign({ _id: user._id, email: userData.email }, SECRET);

    return token;
};