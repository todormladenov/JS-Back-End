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

module.exports = router;