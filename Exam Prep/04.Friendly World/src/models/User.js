const mongoose = require('mongoose');

const mongooseSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minLength: 10
    },
    password: {
        type: String,
        required: true
    },
    animals: [{
        type: mongoose.Types.ObjectId,
        ref: 'Animal'
    }]
});

const User = mongoose.model('User', mongooseSchema);

module.exports = User;