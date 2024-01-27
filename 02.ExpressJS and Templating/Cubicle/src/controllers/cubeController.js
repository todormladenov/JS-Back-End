const router = require('express').Router();
const cubeServices = require('../services/cubeServices');

router.get('/cube/create', (req, res) => {
    res.render('create');
});

router.post('/cube/create', async (req, res) => {
    const newCube = req.body;
    await cubeServices.addCube(newCube);

    res.redirect('/');
});

router.get('/cube/details/:id', async (req, res) => {
    const id = req.params.id;
    const cube = await cubeServices.getById(id).lean();

    res.render('details', cube)
});

module.exports = router;