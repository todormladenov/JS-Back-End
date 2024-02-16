const { isAuth } = require('../middlewares/authMiddleware');
const gameServices = require('../services/gameServices');
const { getErrorMessage } = require('../utils/error');

const router = require('express').Router();

router.get('/game/create', isAuth, async (req, res) => {
    res.render('create');
});

router.post('/game/create', isAuth, async (req, res) => {
    const gameData = req.body;
    const userId = req.user._id;

    try {
        await gameServices.create({
            ...gameData,
            owner: userId
        });

        res.redirect('/')
    } catch (error) {
        res.render('create', { ...gameData, error: getErrorMessage(error) });
    }
});

module.exports = router;