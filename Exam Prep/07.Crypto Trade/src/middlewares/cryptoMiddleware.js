const cryptoServices = require('../services/cryptoServices');

exports.isBought = async (req, res, next) => {
    const cryptoId = req.params.id;
    const userId = req.user._id;

    const crypto = await cryptoServices.getById(cryptoId).lean();
    const isBought = crypto.boughtBy.some(id => id == userId);

    if (isBought || userId == crypto.owner) {
        return res.redirect('/crypto');
    }

    next();
};

exports.isOwner = async (req, res, next) => {
    const cryptoId = req.params.id;
    const userId = req.user._id;

    const crypto = await cryptoServices.getById(cryptoId).lean();
    const isOwner = crypto.owner == userId;

    if (!isOwner) {
        return res.redirect('/crypto');
    }

    req.crypto = crypto;
    next();
};