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

    try {
        const movie = await movieServices.getById(movieId);
        const isOwner = movie.owner_id == req.user?._id;

        movie.ratingStars = '&#x2605'.repeat(movie.rating);
        res.render('movie/details', { movie, isOwner });
    } catch (error) {
        const message = getErrorMessage(error);
        res.render('404', { error: message });
    }
});

router.get('/movie/:id/attach', isAuth, async (req, res) => {
    const movieId = req.params.id;
    const userId = req.user._id;

    try {
        const movie = await movieServices.getByIdWithAvailableCast(movieId, userId);

        res.render('movie/attach', { movie });
    } catch (error) {
        const message = getErrorMessage(error);

        res.render('404', { error: message });
    }

});

router.post('/movie/:id/attach', isAuth, async (req, res) => {
    const movieId = req.params.id;
    const castId = req.body.cast;
    const userId = req.user._id;

    try {
        await movieServices.attach(movieId, castId, userId);
        
        res.redirect(`/movie/${movieId}/attach`);
    } catch (error) {
        const message = getErrorMessage(error);

        res.render('404', { error: message });
    }

});

router.get('/movie/:id/edit', isAuth, async (req, res) => {
    const movieId = req.params.id;

    try {
        const movie = await movieServices.getById(movieId);
        
        res.render('movie/edit', { ...movie });
    } catch (error) {
        const message = getErrorMessage(error);

        res.render('404', { error: message });
    }
});

router.post('/movie/:id/edit', isAuth, async (req, res) => {
    const movieData = req.body;
    const movieId = req.params.id;
    const userId = req.user._id;

    try {
        await movieServices.update(movieId, movieData, userId);
        
        res.redirect(`/movie/details/${movieId}`);
    } catch (error) {
        const message = getErrorMessage(error);
        res.render('movie/edit', { ...movieData, error: message });
    }

})

router.get('/movie/:id/delete', isAuth, async (req, res) => {
    const userId = req.user._id;
    const movieId = req.params.id;

    try {
        await movieServices.delete(req.params.id, userId);
        
        res.redirect('/');
    } catch (error) {
        const message = getErrorMessage(error);

        res.render('404', { error: message });
    }
});


module.exports = router;