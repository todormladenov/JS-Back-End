const { isAuth } = require('../middlewares/authMiddleware');
const { getErrorMessage } = require('../utils/error');
const bookServices = require('../services/bookServices');
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

module.exports = router;