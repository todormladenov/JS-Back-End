const mongoose = require('mongoose');

const electronicsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    damages: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    production: {
        type: String,
        required: true
    },
    exploitation: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
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