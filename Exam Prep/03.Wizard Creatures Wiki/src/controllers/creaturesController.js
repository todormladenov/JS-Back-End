const router = require('express').Router();
const { isAuth } = require('../middlewares/authMiddleware');
const creaturesServices = require('../services/creaturesServices');
const { getErrorMessage } = require('../utils/error');

router.get('/post/create', isAuth, (req, res) => {
    res.render('create');
});

router.post('/post/create', isAuth, async (req, res) => {
    const creatureData = req.body;
    const userId = req.user._id;

    try {
        await creaturesServices.create(creatureData, userId);
        res.redirect('/')
    } catch (error) {
        res.render('create', { ...creatureData, error: getErrorMessage(error) });
    }
});

router.get('/posts', async (req, res) => {
    const creatures = await creaturesServices.getAll().lean();
    res.render('catalog', { creatures });
});

router.get('/post/details/:id', async (req, res) => {
    const createId = req.params.id;
    const userId = req.user?._id;

    const creature = await creaturesServices.getByIdPopulated(createId).lean();

    creature.isOwner = creature.owner._id == userId;
    creature.isVoted = creature.votes.some(users => users._id == userId);
    creature.votedList = creature.votes.map(user => user.email).join(', ') || false;

    res.render('details', { ...creature })
});

router.get('/post/vote/:id', isAuth, async (req, res) => {
    const createId = req.params.id;
    const userId = req.user._id;

    await creaturesServices.vote(createId, userId);
    res.redirect(`/post/details/${createId}`);
});

module.exports = router;