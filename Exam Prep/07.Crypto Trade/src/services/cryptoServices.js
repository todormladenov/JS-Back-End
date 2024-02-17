const Crypto = require("../models/Crypto");

exports.create = (cryptoData, userId) => Crypto.create({ ...cryptoData, owner: userId });