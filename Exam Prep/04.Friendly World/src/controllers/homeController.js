const router = require('express').Router();
const animalServices = require('../services/animalServices');

router.get('/', async (req, res) => {
    const animals = await animalServices.getRecent().lean();
    res.render('home', { animals });
});

module.exports = router;