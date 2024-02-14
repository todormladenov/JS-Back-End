const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: [3, 'First Name is too short']
    },
    lastName: {
        type: String,
        required: true,
        minLength: [3, 'Last Name is too short']
    },
    email: {
        type: String,
        required: true,
        minLength: [10, 'Email is too short']
    },
    password: {
        type: String,
        required: true,
    },
    creatures: [{
        type: mongoose.Types.ObjectId,
        ref: 'Creature'
    }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;