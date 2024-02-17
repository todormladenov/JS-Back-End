const { isAuth } = require('../middlewares/authMiddleware');
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
module.exports = router;