const router = require('express').Router();
const cubeServices = require('../services/cubeServices');

router.get('/', (req, res) => {
    const cubes = cubeServices.getAll();
    res.render('home', { cubes });
});

router.get('/about', (req, res) => {
    res.render('about');
});

router.get('/search', (req, res) => {
    const { name, from, to } = req.query;

    const cubes = cubeServices.search(name, from, to);
    res.render('home', { cubes });
});

router.get('/404', (req, res) => {
    res.render('404')
});

module.exports = router;