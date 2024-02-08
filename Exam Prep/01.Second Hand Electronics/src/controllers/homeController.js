const router = require('express').Router();
const electronicsServices = require('../services/electronicsServices');
const { getErrorMessage } = require('../utils/error');

router.get('/', (req, res) => {
    res.render('home')
});

router.get('/404', (req, res) => {
    res.render('404');
});

router.get('/search', async (req, res) => {
    const { name, type } = req.query;
    const electronics = await electronicsServices.search(name, type).lean();

    res.render('search', { electronics });
});

module.exports = router;