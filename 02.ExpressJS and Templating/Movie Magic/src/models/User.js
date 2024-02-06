const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        password: String,
        required: true,
        unique: true,
        match: [/\@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/, 'Invalid email format.'],
        minLength: [10, 'Email should be 10 characters long']
    },
    password: {
        type: String,
        required: true
    },
    movies: [{
        type: mongoose.Types.ObjectId,
        ref: 'Movie'
    }]

});

const User = mongoose.model('User', userSchema);

module.exports = User;