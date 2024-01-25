const router = require('express').Router();
const movieServices = require('../services/movieServices');

router.get('/', async (req, res) => {
    const movies = await movieServices.getAll().lean();
    res.render('home', { movies });
});

router.get('/about', (req, res) => {
    res.render('about')
});

router.get('/search', async (req, res) => {
    const { title, genre, year } = req.query;
    const movies = await movieServices.search(title, genre, year).lean();

    res.render('search', { movies, title, genre, year });
});

router.get('/404', (req, res) => {
    res.render('404');
});

module.exports = router;