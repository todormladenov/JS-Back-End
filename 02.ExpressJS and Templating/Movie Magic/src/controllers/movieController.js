const router = require('express').Router();
const movieServices = require('../services/movieServices');
const castServices = require('../services/castServices');
const { isAuth } = require('../middlewares/authMiddleware');
const { getErrorMessage } = require('../utils/error');

router.get('/movie/create', isAuth, (req, res) => {
    res.render('movie/movieCreate');
});

router.post('/movie/create', isAuth, async (req, res) => {
    const newMovie = req.body;
    const userId = req.user._id;
    newMovie.owner_id = userId;

    try {
        await movieServices.create(newMovie, userId);

        res.redirect('/');
    } catch (error) {
        const message = getErrorMessage(error);
        res.render('movie/movieCreate', { ...newMovie, error: message });
    }

});

router.get('/movie/details/:id', async (req, res) => {
    const movieId = req.params.id;
    const movie = await movieServices.getById(movieId).lean();
    const isOwner = movie.owner_id == req.user?._id;

    movie.ratingStars = '&#x2605'.repeat(movie.rating);
    res.render('movie/details', { movie, isOwner });
});

router.get('/movie/:id/attach', isAuth, async (req, res) => {
    const movieId = req.params.id;
    const movie = await movieServices.getByIdWithAvailableCast(movieId);

    res.render('movie/attach', { movie });
});

router.post('/movie/:id/attach', isAuth, async (req, res) => {
    const movieId = req.params.id;
    const castId = req.body.cast;
    const userId = req.user._id;

    await movieServices.attach(movieId, castId, userId);

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
    const userId = req.user._id;

    await movieServices.update(movieId, movieData, userId);

    res.redirect(`/movie/details/${movieId}`);
})

router.get('/movie/:id/delete', isAuth, async (req, res) => {
    await movieServices.delete(req.params.id, req.user._id);

    res.redirect('/');
});


module.exports = router;