const router = require('express').Router();
const cubeServices = require('../services/cubeServices');

router.get('/cube/create', (req, res) => {
    res.render('create');
});

module.exports = router;