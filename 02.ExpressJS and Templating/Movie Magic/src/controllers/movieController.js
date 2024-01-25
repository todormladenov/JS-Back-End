const router = require('express').Router();
const movieServices = require('../services/movieServices');

router.get('/movie/create', (req, res) => {
    res.render('movieCreate');
});

router.post('/movie/create', async (req, res) => {
    const newMovie = req.body;

    await movieServices.create(newMovie);
    
    res.redirect('/');
});

router.get('/movie/details/:id', async (req, res) => {
    const movieId = req.params.id;
    const movie = await movieServices.getById(movieId).lean();

    movie.ratingStars = '&#x2605'.repeat(movie.rating);
    res.render('details', movie);
});

module.exports = router;