const mongoose = require('mongoose');

const mongooseSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: 5,
        trim: true
    },
    email: {
        type: String,
        required: true,
        minLength: 10,
        trim: true
    },
    password: {
        type: String,
        required: true,
    }
});

const User = mongoose.model('User', mongooseSchema);

module.exports = User;