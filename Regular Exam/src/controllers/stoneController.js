const { isAuth } = require('../middlewares/authMiddleware');
const { isLiked, isOwner } = require('../middlewares/stoneMiddleware');
const stoneServices = require('../services/stoneServices');
const { getErrorMessage } = require('../utils/error');
const router = require('express').Router();

router.get('/', async (req, res) => {
    const stones = await stoneServices.getAll().lean();

    res.render('dashboard', { stones });
});

router.get('/create', isAuth, (req, res) => {
    res.render('create')
});

router.post('/create', isAuth, async (req, res) => {
    const stoneData = req.body;
    const userId = req.user._id;

    try {
        await stoneServices.create(stoneData, userId);

        res.redirect('/stone');
    } catch (error) {
        res.render('create', { ...stoneData, error: getErrorMessage(error) });
    }
});

router.get('/:id/details', async (req, res) => {
    const stoneId = req.params.id;
    const userId = req.user?._id;

    const stone = await stoneServices.getById(stoneId).lean();

    stone.isOwner = stone.owner == userId;
    stone.isLiked = stone.likedList.some(id => id == userId);

    res.render('details', { ...stone });
});

router.get('/:id/like', isAuth, isLiked, async (req, res) => {
    const stoneId = req.params.id;
    const userId = req.user._id;

    await stoneServices.like(stoneId, userId);
    res.redirect(`/stone/${stoneId}/details`);
});

router.get('/:id/delete', isAuth, isOwner, async (req, res) => {
    const stoneId = req.params.id;

    await stoneServices.delete(stoneId);
    res.redirect('/stone');
});

router.get('/:id/edit', isAuth, isOwner, (req, res) => {
    res.render('edit', { ...req.stone });
});

router.post('/:id/edit', isAuth, isOwner, async (req, res) => {
    const stoneData = req.body;
    const stoneId = req.params.id;

    try {
        await stoneServices.update(stoneId, stoneData);

        res.redirect(`/stone/${stoneId}/details`);
    } catch (error) {
        res.render('edit', {
            ...stoneData,
            error: getErrorMessage(error)
        });
    }
});

module.exports = router;