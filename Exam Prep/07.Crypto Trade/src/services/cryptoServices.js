const Crypto = require("../models/Crypto");

exports.create = (cryptoData, userId) => Crypto.create({ ...cryptoData, owner: userId });

exports.getAll = () => Crypto.find();

exports.getById = (cryptoId) => Crypto.findById(cryptoId);

exports.buy = (cryptoId, userId) => Crypto.findByIdAndUpdate(cryptoId, { $push: { boughtBy: userId } });

exports.delete = (cryptoId) => Crypto.findByIdAndDelete(cryptoId);