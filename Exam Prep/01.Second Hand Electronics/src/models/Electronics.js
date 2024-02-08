const mongoose = require('mongoose');

const electronicsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 10
    },
    type: {
        type: String,
        required: true,
        minLength: 2
    },
    damages: {
        type: String,
        required: true,
        minLength: 10
    },
    image: {
        type: String,
        required: true,
        match: [/^https?:\/\//, 'Movie Poster should start with http:// or https://']
    },
    description: {
        type: String,
        required: true,
        minLength: 10,
        maxLength: 200,
    },
    production: {
        type: Number,
        required: true,
        min: 1900,
        max: 2023
    },
    exploitation: {
        type: Number,
        required: true,
        min: 1
    },
    price: {
        type: Number,
        required: true,
        min: 1
    },
    buyingList: [{
        type: mongoose.Types.ObjectId,
        ref: "User"
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    }
});

const Electronics = mongoose.model('Electronics', electronicsSchema);

module.exports = Electronics;