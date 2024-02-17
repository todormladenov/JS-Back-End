const { isAuth } = require('../middlewares/authMiddleware');
const { getErrorMessage } = require('../utils/error');
const bookServices = require('../services/bookServices');
const { isWished, isOwner } = require('../middlewares/bookMiddleware');
const router = require('express').Router();

router.get('/create', isAuth, (req, res) => {
    res.render('create');
});

router.post('/create', isAuth, async (req, res) => {
    const bookData = req.body;
    const userId = req.user._id;

    try {
        await bookServices.create(bookData, userId);

        res.redirect('/book/catalog');
    } catch (error) {
        res.render('create', { ...bookData, error: getErrorMessage(error) });
    }
});

router.get('/catalog', async (req, res) => {
    const books = await bookServices.getAll().lean();
    res.render('catalog', { books });
});

router.get('/:id/details', async (req, res) => {
    const bookId = req.params.id;
    const userId = req.user?._id;

    const book = await bookServices.getById(bookId).lean();

    book.isOwner = book.owner == userId;
    book.isWished = book.wishList.some(id => id == userId);

    res.render('details', { ...book });
});

router.get('/:id/wish', isAuth, isWished, async (req, res) => {
    const bookId = req.params.id;
    const userId = req.user?._id;

    await bookServices.wish(bookId, userId);
    res.redirect(`/book/${bookId}/details`);
});

router.get('/:id/delete', isAuth, isOwner, async (req, res) => {
    const bookId = req.params.id;
    const userId = req.user?._id;

    await bookServices.delete(bookId, userId);
    res.redirect('/book/catalog');
});

router.get('/:id/edit', isAuth, isOwner, (req, res) => {
    res.render('edit', { ...req.book });
});

router.post('/:id/edit', isAuth, isOwner, async (req, res) => {
    const bookData = req.body;
    const bookId = req.params.id;

    try {
        await bookServices.update(bookId, bookData);

        res.redirect(`/book/${bookId}/details`);
    } catch (error) {
        res.render('edit', { ...bookData, error: getErrorMessage(error) });
    }
});

module.exports = router;