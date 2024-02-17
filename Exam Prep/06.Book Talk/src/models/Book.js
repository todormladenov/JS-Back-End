const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: 2
    },
    author: {
        type: String,
        required: true,
        minLength: 5
    },
    genre: {
        type: String,
        require: true,
        minLength: 3
    },
    stars: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    image: {
        type: String,
        required: true,
        match: /^https?:\/\//
    },
    review: {
        type: String,
        require: true,
        minLength: 10
    },
    wishList: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;