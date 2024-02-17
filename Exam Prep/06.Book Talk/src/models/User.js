const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: 4
    },
    email: {
        type: String,
        required: true,
        minLength: 10
    },
    password: {
        type: String,
        required: true,
    },
    wishList: [{
        type: mongoose.Types.ObjectId,
        ref: 'Book'
    }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;