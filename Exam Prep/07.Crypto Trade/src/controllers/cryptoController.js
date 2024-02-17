const { isAuth } = require('../middlewares/authMiddleware');
const { isBought, isOwner } = require('../middlewares/cryptoMiddleware');
const cryptoServices = require('../services/cryptoServices');
const { getErrorMessage } = require('../utils/error');
const getOptions = require('../utils/getOptions');
const router = require('express').Router();

router.get('/', async (req, res) => {
    const crypto = await cryptoServices.getAll().lean();

    res.render('catalog', { crypto });
});

router.get('/create', isAuth, (req, res) => {
    res.render('create')
});

router.post('/create', isAuth, async (req, res) => {
    const cryptoData = req.body;
    const userId = req.user._id;

    try {
        await cryptoServices.create(cryptoData, userId);

        res.redirect('/crypto');
    } catch (error) {
        cryptoData.options = getOptions(cryptoData.payment)
        res.render('create', { ...cryptoData, error: getErrorMessage(error) });
    }
});

router.get('/:id/details', async (req, res) => {
    const cryptoId = req.params.id;
    const userId = req.user?._id;

    const crypto = await cryptoServices.getById(cryptoId).lean();

    crypto.isOwner = crypto.owner == userId;
    crypto.isBought = crypto.boughtBy.some(id => id == userId);

    res.render('details', { ...crypto });
});

router.get('/:id/buy', isAuth, isBought, async (req, res) => {
    const cryptoId = req.params.id;
    const userId = req.user._id;

    await cryptoServices.buy(cryptoId, userId);
    res.redirect(`/crypto/${cryptoId}/details`);
});

router.get('/:id/delete', isAuth, isOwner, async (req, res) => {
    const cryptoId = req.params.id;

    await cryptoServices.delete(cryptoId);
    res.redirect('/crypto');
});

module.exports = router;