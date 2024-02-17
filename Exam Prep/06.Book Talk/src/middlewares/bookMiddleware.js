const bookServices = require('../services/bookServices');

exports.isWished = async (req, res, next) => {
    const bookId = req.params.id;
    const userId = req.user?._id;

    const book = await bookServices.getById(bookId).lean();
    const isWished = book.wishList.some(id => id == userId);

    if (isWished) {
        return res.redirect('/book/catalog');
    }

    next();
};