const router = require('express').Router();
const cubeServices = require('../services/cubeServices');

router.get('/', async (req, res) => {
    const cubes = await cubeServices.getAll().lean();
    res.render('home', { cubes });
});

router.get('/about', (req, res) => {
    res.render('about');
});

router.get('/search', async (req, res) => {
    const { name, from, to } = req.query;

    const cubes = await cubeServices.search(name, from, to).lean();
    res.render('home', { cubes });
});

router.get('/404', (req, res) => {
    res.render('404')
});

module.exports = router;