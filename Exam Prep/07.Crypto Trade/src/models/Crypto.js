const { Schema, model, Types } = require('mongoose');

const cryptoSchema = new Schema({
    name: {
        type: String,
        required: true,
        minLength: 2
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    image: {
        type: String,
        required: true,
        match: /^https?:\/\//
    },
    description: {
        type: String,
        required: true,
        minLength: 10
    },
    payment: {
        type: String,
        required: true,
        enum: {
            values: ['crypto-wallet', 'credit-card', 'debit-card', 'paypal'],
            message: '{VALUE} is not valid'
        }
    },
    boughtBy: [{
        type: Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: Types.ObjectId,
        ref: 'User'
    }
});

const Crypto = model('Crypto', cryptoSchema);

module.exports = Crypto;