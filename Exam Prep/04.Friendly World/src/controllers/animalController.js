const { isAuth } = require('../middlewares/authMiddleware');
const { getErrorMessage } = require('../utils/error');
const animalServices = require('../services/animalServices');

const router = require('express').Router();

router.get('/animal/create', isAuth, (req, res) => {
    res.render('create');
});

router.post('/animal/create', isAuth, async (req, res) => {
    const animalData = req.body;
    const userId = req.user._id;

    try {
        await animalServices.create(animalData, userId);

        res.redirect('/');
    } catch (error) {
        res.render('create', { ...animalData, error: getErrorMessage(error) });
    }
});

module.exports = router;