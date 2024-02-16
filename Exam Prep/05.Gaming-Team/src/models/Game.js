// The platform must be one of the following options: "PC", "Nintendo", "PS4", "PS5", "XBOX".
const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 4,
        trim: true
    },
    image: {
        type: String,
        required: true,
        match: /^https?:\/\//,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0,
        trim: true
    },
    description: {
        type: String,
        required: true,
        minLength: 10,
        trim: true
    },
    genre: {
        type: String,
        required: true,
        minLength: 2,
        trim: true
    },
    platform: {
        type: String,
        required: true,
        enum: {
            values: ['PC', 'Nintendo', 'PS4', 'PS5', 'XBOX'],
            message: '{VALUE} is not valid'
        },
        trim: true
    },
    boughtBy: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;