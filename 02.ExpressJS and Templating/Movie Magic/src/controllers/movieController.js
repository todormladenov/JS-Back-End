const router = require('express').Router();
const movieServices = require('../services/movieServices');
const castServices = require('../services/castServices');

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
    res.render('details', { movie });
});

router.get('/movie/:id/attach', async (req, res) => {
    const movieId = req.params.id;
    const movie = await movieServices.getById(movieId).lean();
    const cast = await castServices.getAll().lean();

    res.render('movie/attach', { movie, cast });
});

router.post('/movie/:id/attach', async (req, res) => {
    const movieId = req.params.id;
    const castId = req.body.cast;

    await movieServices.attach(movieId, castId);
    await castServices.attach(movieId, castId);

    res.redirect(`/movie/${movieId}/attach`);
});

module.exports = router;