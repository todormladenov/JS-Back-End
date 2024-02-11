const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: [5, 'Title should be at least 5 character']
    },
    type: {
        type: String,
        required: true,
        minLength: [3, 'Type should be a minimum of 3 characters long']
    },
    certificate: {
        type: String,
        required: true,
        minLength: [2, 'Certificate should be a minimum of 2 characters long']
    },
    image: {
        type: String,
        required: true,
        match: [/^https?:\/\//, 'Course Image should start with http:// or https://']
    },
    description: {
        type: String,
        required: true,
        minLength: [10, 'Description should be a minimum of 10 characters long']
    },
    price: {
        type: Number,
        required: true,
        min: [1, 'Price should be a positive number']
    },
    signUpList: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    votes: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;