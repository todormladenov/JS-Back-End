const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 2
    },
    kind: {
        type: String,
        required: true,
        minLength: 3
    },
    image: {
        type: String,
        required: true,
        match: /^https?:\/\//
    },
    years: {
        type: Number,
        required: true,
        min: 1,
        max: 100
    },
    need: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 20
    },
    description: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 50
    },
    location: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 15
    },
    donations: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

const Animal = mongoose.model('Animal', animalSchema);

module.exports = Animal;