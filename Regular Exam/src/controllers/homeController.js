const router = require('express').Router();
const stoneServices = require('../services/stoneServices');

router.get('/', async (req, res) => {
    const stones = await stoneServices.getMostRecent().lean();
    res.render('home', { stones });
});

router.get('/search', async (req, res) => {
    const query = req.query;

    const stones = await stoneServices.search(query).lean();
    res.render('search', { stones });
});

module.exports = router;