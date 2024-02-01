const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true,
        lowercase: true,
    },
    director: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
        max: 2030,
        min: 1900,
    },
    rating: {
        type: Number,
        required: true,
        max: 5,
        min: 1,
    },
    description: {
        type: String,
        required: true,
        maxLength: 1000,
    },
    imageURL: {
        type: String,
        required: true,
        match: /^https?:\/\//
    },
    cast: [{
        type: mongoose.Types.ObjectId,
        ref: "Cast"
    }],
    owner_id: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;