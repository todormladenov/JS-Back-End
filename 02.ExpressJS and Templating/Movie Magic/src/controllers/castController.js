const router = require('express').Router();
const castServices = require('../services/castServices');
const { isAuth } = require('../middlewares/authMiddleware');

router.get('/cast/create', isAuth, (req, res) => {
    res.render('cast/create');
});

router.post('/cast/create', isAuth, async (req, res) => {
    const castData = req.body;

    await castServices.create(castData);

    res.redirect('/cast/create');
});


module.exports = router;