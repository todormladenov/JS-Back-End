const mongoose = require('mongoose');

const cubeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        maxLength: 500
    },
    imgUrl: {
        type: String,
        required: true,
        match: /^https?:\/\//,
    },
    difficulty: {
        type: Number,
        required: true,
        min: 1,
        max: 6
    },
    accessories: [{
        type: mongoose.Types.ObjectId,
        ref: 'Accessory'
    }],
    owner_id: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

const Cube = mongoose.model('Cube', cubeSchema);

module.exports = Cube;