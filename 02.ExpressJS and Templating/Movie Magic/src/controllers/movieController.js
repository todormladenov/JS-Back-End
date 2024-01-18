const router = require('express').Router();
const movieServices = require('../services/movieServices');

router.get('/movie/create', (req, res) => {
    res.render('movieCreate');
});

router.post('/movie/create', (req, res) => {
    const newMovie = req.body;
    movieServices.create(newMovie);

    res.redirect('/');
});

router.get('/movie/details/:id', (req, res) => {
    const movieId = req.params.id;
    const movie = movieServices.getById(movieId);

    if (!movie) {
        res.redirect('/404');
    }

    movie.ratingStars = '&#x2605'.repeat(movie.rating);
    res.render('details', movie);
});

module.exports = router;