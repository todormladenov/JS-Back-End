const router = require('express').Router();
const castServices = require('../services/castServices');

router.get('/cast/create', (req, res) => {
    res.render('cast/create');
});

router.post('/cast/create', async (req, res) => {
    const castData = req.body;

    await castServices.create(castData);

    res.redirect('/cast/create');
});


module.exports = router;