const { isAuth } = require('../middlewares/authMiddleware');
const { getErrorMessage } = require('../utils/error');
const animalServices = require('../services/animalServices');
const { isDonated, isOwner } = require('../middlewares/animalsMiddleware');

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

    animal.isOwner = animal.owner == userId;
    animal.isDonated = animal.donations.some(id => id == userId);

    res.render('details', { ...animal });
});

router.get('/animal/donate/:id', isAuth, isDonated, async (req, res) => {
    const animalId = req.params.id;
    const userId = req.user._id;

    await animalServices.donate(animalId, userId);
    res.redirect(`/animal/details/${animalId}`);
});

router.get('/animal/edit/:id', isAuth, isOwner, async (req, res) => {
    res.render('edit', { ...req.animal });
});

router.post('/animal/edit/:id', isAuth, isOwner, async (req, res) => {
    const animalData = req.body;
    const animalId = req.params.id;

    try {
        await animalServices.edit(animalId, animalData);

        res.redirect(`/animal/details/${animalId}`)
    } catch (error) {
        res.render('edit', { ...animalData, error: getErrorMessage(error) });
    }
});

router.get('/animal/delete/:id', isAuth, isOwner, async (req, res) => {
    const animalId = req.params.id;
    const userId = req.user._id;

    await animalServices.delete(animalId, userId);

    res.redirect('/dashboard');
});

router.get('/search', async (req, res) => {
    try {
        const animals = await animalServices.search(req.query.location).lean();
        res.render('search', { animals });
    } catch (error) {
        res.render('search', { error: getErrorMessage(error) });
    }
});

module.exports = router;