const router = require('express').Router();
const movieServices = require('../services/movieServices');

router.get('/', (req, res) => {
    const movies = movieServices.getAll();
    res.render('home', { movies });
});

router.get('/about', (req, res) => {
    res.render('about')
});

router.get('/search', (req, res) => {
    const { title, genre, year } = req.query;
    const movies = movieServices.search(title, genre, year);

    res.render('search', { movies, title, genre, year });
});

router.get('/404', (req, res) => {
    res.render('404');
});

module.exports = router;