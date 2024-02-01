const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        password: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    movies: [{
        type: mongoose.Types.ObjectId,
        ref: 'Movie'
    }]

});

const User = mongoose.model('User', userSchema);

module.exports = User;