const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: [2, 'Username should be at least 2 characters long']
    },
    email: {
        type: String,
        required: true,
        minLength: [10, 'Email should be at least 10 characters long']
    },
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;