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

router.get('/cube/details/:id', (req, res) => {
    const id = req.params.id;
    const cube = cubeServices.getById(id);

    res.render('details', cube)
});

module.exports = router;