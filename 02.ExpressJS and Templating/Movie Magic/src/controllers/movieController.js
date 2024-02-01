const router = require('express').Router();
const movieServices = require('../services/movieServices');
const castServices = require('../services/castServices');
const { isAuth } = require('../middlewares/authMiddleware');

router.get('/movie/create', isAuth, (req, res) => {
    res.render('movie/movieCreate');
});

router.post('/movie/create', isAuth, async (req, res) => {
    const newMovie = req.body;
    const userId = req.user._id;
    newMovie.owner_id = userId
    console.log(req.user);
    await movieServices.create(newMovie, userId);

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

router.get('/movie/:id/edit', isAuth, async (req, res) => {
    const movieId = req.params.id;
    const movie = await movieServices.getById(movieId).lean();

    res.render('movie/edit', { ...movie })
});

router.post('/movie/:id/edit', isAuth, async (req, res) => {
    const movieData = req.body;
    const movieId = req.params.id;

    await movieServices.update(movieId, movieData);

    res.redirect(`/movie/details/${movieId}`);
})

module.exports = router;