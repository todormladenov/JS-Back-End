const Crypto = require("../models/Crypto");

exports.create = (cryptoData, userId) => Crypto.create({ ...cryptoData, owner: userId });

exports.getAll = () => Crypto.find();

exports.getById = (cryptoId) => Crypto.findById(cryptoId);

exports.buy = (cryptoId, userId) => Crypto.findByIdAndUpdate(cryptoId, { $push: { boughtBy: userId } });

exports.delete = (cryptoId) => Crypto.findByIdAndDelete(cryptoId);

exports.update = (cryptoId, cryptoData) => Crypto.findByIdAndUpdate(cryptoId, cryptoData, { runValidators: true });

exports.search = ({ name, payment }) => {
    const query = {};

    if (name) {
        query.name = new RegExp(name, 'i');
    }

    if (payment) {
        query.payment = payment
    }

    return Crypto.find(query);
};