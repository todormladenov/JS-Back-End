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

        res.redirect('/dashboard');
    } catch (error) {
        res.render('create', { ...animalData, error: getErrorMessage(error) });
    }
});

router.get('/dashboard', async (req, res) => {
    const animals = await animalServices.getAll().lean();
    res.render('dashboard', { animals });
});

router.get('/animal/details/:id', async (req, res) => {
    const animalId = req.params.id;
    const userId = req.user?._id;

    const animal = await animalServices.getAnimalById(animalId).lean();

    animal.isOwner = animal.owner._id == userId;
    animal.isDonated = animal.donations.some(id => id == userId);

    res.render('details', { ...animal });
});

router.get('/animal/donate/:id', isAuth, async (req, res) => {
    const animalId = req.params.id;
    const userId = req.user._id;

    await animalServices.donate(animalId, userId);
    res.redirect(`/animal/details/${animalId}`);
});

module.exports = router;