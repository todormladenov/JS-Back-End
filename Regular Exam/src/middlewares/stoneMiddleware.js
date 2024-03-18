const stoneServices = require('../services/stoneServices');

exports.isLiked = async (req, res, next) => {
    const stoneId = req.params.id;
    const userId = req.user._id;

    const stone = await stoneServices.getById(stoneId).lean();
    const isLiked = stone.likedList.some(id => id == userId);

    if (isLiked || userId == stone.owner) {
        return res.redirect('/stone');
    }

    next();
};

exports.isOwner = async (req, res, next) => {
    const stoneId = req.params.id;
    const userId = req.user._id;

    const stone = await stoneServices.getById(stoneId).lean();
    const isOwner = stone.owner == userId;

    if (!isOwner) {
        return res.redirect('/stone');
    }

    req.stone = stone;
    next();
};