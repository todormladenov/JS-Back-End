const router = require('express').Router();
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

module.exports = router;