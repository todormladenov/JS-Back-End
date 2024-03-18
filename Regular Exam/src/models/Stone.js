const { Schema, model, Types } = require('mongoose');

const stoneSchema = new Schema({
    name: {
        type: String,
        required: true,
        minLength: 2,
        trim: true
    },
    category: {
        type: String,
        required: true,
        minLength: 3,
        trim: true
    },
    color: {
        type: String,
        required: true,
        minLength: 2,
        trim: true
    },
    formula: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 30,
        trim: true
    },
    location: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 15,
        trim: true
    },
    image: {
        type: String,
        required: true,
        match: /^https?:\/\//,
        trim: true
    },
    description: {
        type: String,
        required: true,
        minLength: 10,
        trim: true
    },

    likedList: [{
        type: Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

const Stone = model('Stone', stoneSchema);

module.exports = Stone;