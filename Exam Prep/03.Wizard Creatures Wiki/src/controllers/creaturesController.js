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

module.exports = router;