const { isAuth } = require('../middlewares/authMiddleware');
const { isBought } = require('../middlewares/gameMiddleware');
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

        res.redirect('/games')
    } catch (error) {
        res.render('create', { ...gameData, error: getErrorMessage(error) });
    }
});

router.get('/games', async (req, res) => {
    const games = await gameServices.getAll().lean();

    res.render('catalog', { games });
});

router.get('/game/details/:id', async (req, res) => {
    const gameId = req.params.id;
    const userId = req.user?._id;

    const game = await gameServices.getById(gameId).lean();

    game.isOwner = game.owner == userId;
    game.isBought = game.boughtBy.some(id => id == userId);

    res.render('details', { ...game });
});

router.get('/game/buy/:id', isAuth, isBought, async (req, res) => {
    const gameId = req.params.id;
    const userId = req.user?._id;

    await gameServices.buy(gameId, userId);
    res.redirect(`/game/details/${gameId}`);
})

module.exports = router;