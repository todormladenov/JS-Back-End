const router = require('express').Router();
const { isAuth } = require('../middlewares/authMiddleware');
const cryptoServices = require('../services/cryptoServices');

router.get('/', (req, res) => {
    res.render('home')
});

router.get('/search', isAuth, async (req, res) => {
    const query = req.query

    const crypto = await cryptoServices.search(query).lean();
    res.render('search', { crypto });
});

module.exports = router;