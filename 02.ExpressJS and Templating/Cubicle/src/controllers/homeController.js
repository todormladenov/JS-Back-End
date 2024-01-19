const router = require('express').Router();
const cubeServices = require('../services/cubeServices');

router.get('/', (req, res) => {
    const cubes = cubeServices.getAll();
    res.render('home', { cubes });
});

module.exports = router;