const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('../utils/jwt');
const { SECRET } = require('../config/config');

exports.login = async (email, password) => {
    const user = User.findOne({ email: email });

    if (!user) {
        throw new Error('Email or password don\'t match');
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw new Error('Email or password don\'t match');
    }

    const token = jwt.sign({ _id: user._id, email: user.email }, SECRET);

    return token
}