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
    const creatureId = req.params.id;
    const userId = req.user?._id;

    const creature = await creaturesServices.getByIdPopulated(creatureId).lean();

    creature.isOwner = creature.owner._id == userId;
    creature.isVoted = creature.votes.some(users => users._id == userId);
    creature.votedList = creature.votes.map(user => user.email).join(', ') || false;

    res.render('details', { ...creature })
});

router.get('/post/vote/:id', isAuth, async (req, res) => {
    const creatureId = req.params.id;
    const userId = req.user._id;

    await creaturesServices.vote(creatureId, userId);
    res.redirect(`/post/details/${creatureId}`);
});

router.get('/post/edit/:id', isOwner, (req, res) => {
    res.render('edit', { ...req.creature });
});

router.post('/post/edit/:id', isOwner, async (req, res) => {
    const creatureId = req.params.id;
    const creatureData = req.body;

    try {
        await creaturesServices.update(creatureData, creatureId);
        res.redirect(`/post/details/${creatureId}`);
    } catch (error) {
        res.render('edit', { ...creatureData, error: getErrorMessage(error) });
    }
});

router.get('/post/delete/:id', isOwner, async (req, res) => {
    const creatureId = req.params.id;
    const userId = req.user?._id;

    await creaturesServices.delete(creatureId, userId);
    res.redirect('/posts');
});

async function isOwner(req, res, next) {
    const creature = await creaturesServices.getById(req.params.id).lean();

    if (creature.owner._id != req.user?._id) {
        return res.redirect('/');
    }

    req.creature = creature;
    next();
}

module.exports = router;