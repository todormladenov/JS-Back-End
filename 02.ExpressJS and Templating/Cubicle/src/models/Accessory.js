const mongoose = require('mongoose');

const accessorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String,
        required: true,
        match: /^https?:\/\//,
    },
    description: {
        type: String,
        required: true,
        maxLength: 500
    },
    cubes: [{
        type: mongoose.Types.ObjectId,
        ref: 'Cube'
    }]
});

const Accessory = mongoose.model('Accessory', accessorySchema);

module.exports = Accessory;