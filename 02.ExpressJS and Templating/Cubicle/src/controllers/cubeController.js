const router = require('express').Router();
const cubeServices = require('../services/cubeServices');

router.get('/cube/create', (req, res) => {
    res.render('create');
});

router.post('/cube/create', (req, res) => {
    const newCube = req.body;
    cubeServices.addCube(newCube);

    res.redirect('/');
});

module.exports = router;