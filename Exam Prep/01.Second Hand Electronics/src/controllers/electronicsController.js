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

module.exports = router;