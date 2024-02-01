const router = require('express').Router();
const movieServices = require('../services/movieServices');
const castServices = require('../services/castServices');
const { isAuth } = require('../middlewares/authMiddleware');

router.get('/movie/create', isAuth, (req, res) => {
    res.render('movie/movieCreate');
});

router.post('/movie/create', isAuth, async (req, res) => {
    const newMovie = req.body;

    await movieServices.create(newMovie);

    res.redirect('/');
});

router.get('/movie/details/:id', async (req, res) => {
    const movieId = req.params.id;
    const movie = await movieServices.getById(movieId).lean();

    movie.ratingStars = '&#x2605'.repeat(movie.rating);
    res.render('movie/details', { movie });
});

router.get('/movie/:id/attach', isAuth, async (req, res) => {
    const movieId = req.params.id;
    const movie = await movieServices.getByIdWithAvailableCast(movieId);

    res.render('movie/attach', { movie });
});

router.post('/movie/:id/attach', isAuth, async (req, res) => {
    const movieId = req.params.id;
    const castId = req.body.cast;

    await movieServices.attach(movieId, castId);
    await castServices.attach(movieId, castId);

    res.redirect(`/movie/${movieId}/attach`);
});

module.exports = router;