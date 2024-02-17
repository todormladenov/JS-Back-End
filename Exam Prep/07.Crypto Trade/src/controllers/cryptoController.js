const { isAuth } = require('../middlewares/authMiddleware');
const cryptoServices = require('../services/cryptoServices');
const { getErrorMessage } = require('../utils/error');
const router = require('express').Router();

router.get('/create', isAuth, (req, res) => {
    res.render('create')
});

router.post('/create', isAuth, async (req, res) => {
    const cryptoData = req.body;
    const userId = req.user._id;

    try {
        await cryptoServices.create(cryptoData, userId);

        res.redirect('/');
    } catch (error) {
        res.render('create', { ...cryptoData, error: getErrorMessage(error) });
    }
});

module.exports = router;