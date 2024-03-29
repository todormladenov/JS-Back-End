const gameServices = require('../services/gameServices');

exports.isBought = async (req, res, next) => {
    const game = await gameServices.getById(req.params.id);

    const isBought = game.boughtBy.some(id => id == req.user._id);

    if (isBought || game.owner == req.user._id) {
        return res.redirect('/games');
    }

    next();
};

exports.isOwner = async (req, res, next) => {
    const game = await gameServices.getById(req.params.id).lean();

    const isOwner = game.owner == req.user?._id;

    if (!isOwner) {
        return res.redirect('/games');
    }

    req.game = game;
    next();
};