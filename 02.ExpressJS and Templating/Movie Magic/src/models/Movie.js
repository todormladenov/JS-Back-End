const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is Required'],
        match: [/^[a-zA-Z0-9\s]{5,}$/, 'Title must be at least 5 characters long, with English letters or digits.']
    },
    genre: {
        type: String,
        required: [true, 'Genre is Required'],
        lowercase: true,
        match: [/^[a-zA-Z0-9\s]{5,}$/, 'Genre must be at least 5 characters long, with English letters or digits.']
    },
    director: {
        type: String,
        required: [true, 'Director is Required'],
        match: [/^[a-zA-Z0-9\s]{5,}$/, 'Director must be at least 5 characters long, with English letters or digits.']
    },
    year: {
        type: Number,
        required: [true, 'Year is Required'],
        max: [2030, 'Year must be between 1900 and 2023'],
        min: [1900, 'Year must be between 1900 and 2023'],
    },
    rating: {
        type: Number,
        required: [true, 'Rating is Required'],
        max: [5, 'Rating must be between 1 and 5'],
        min: [1, 'Rating must be between 1 and 5'],
    },
    description: {
        type: String,
        required: [true, 'Description is Required'],
        maxLength: 1000,
    },
    imageURL: {
        type: String,
        required: [true, 'Movie Poster is Required'],
        match: [/^https?:\/\//, 'Movie Poster should start with http:// or https://']
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