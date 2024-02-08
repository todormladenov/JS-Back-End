const router = require('express').Router();
const { isAuth } = require('../middlewares/authMIddleware');
const electronicsServices = require('../services/electronicsServices');
const { getErrorMessage } = require('../utils/error');

router.get('/catalog', async (req, res) => {
    try {
        const electronics = await electronicsServices.getAll().lean();
        res.render('catalog', { electronics })
    } catch (error) {
        const message = getErrorMessage(error);
        res.render('catalog', { error: message });
    }
});

router.get('/create/offer', isAuth, (req, res) => {
    res.render('create')
});

router.post('/create/offer', isAuth, async (req, res) => {
    const userId = req.user._id;
    const offerData = req.body;

    try {
        await electronicsServices.create(userId, offerData);
        res.redirect('/catalog');
    } catch (error) {
        const message = getErrorMessage(error);
        res.render('create', { ...offerData, error: message });
    }
});

router.get('/electronic/details/:id', async (req, res) => {
    const userId = req.user?._id;
    const offerId = req.params.id;

    try {
        const electronic = await electronicsServices.getById(offerId, userId);

        res.render('details', { ...electronic });
    } catch (error) {
        const message = getErrorMessage(error);
        res.render('404', { error: message });
    }
});

router.get('/delete/:id', isAuth, async (req, res) => {
    const offerId = req.params.id;

    try {
        await electronicsServices.delete(offerId);

        res.redirect('/catalog');
    } catch (error) {
        const message = getErrorMessage(error);
        res.render('404', { error: message });
    }
});

router.get('/edit/:id', isAuth, async (req, res) => {
    const offerId = req.params.id;

    try {
        const electronic = await electronicsServices.getById(offerId);

        res.render('edit', { ...electronic });
    } catch (error) {
        const message = getErrorMessage(error);
        res.render('404', { error: message });
    }
});

module.exports = router;