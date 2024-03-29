const router = require('express').Router();
const cubeServices = require('../services/cubeServices');
const accessoryServices = require('../services/accessoryServices');
const { isAuth } = require('../middlewares/authMiddleware');
const { getDifficulties } = require('../utils/difficultyOption');

router.get('/cube/create', isAuth, (req, res) => {
    res.render('create');
});

router.post('/cube/create', isAuth, async (req, res) => {
    const newCube = req.body;
    await cubeServices.addCube(newCube, req.user._id);

    res.redirect('/');
});

router.get('/cube/details/:id', async (req, res) => {
    const id = req.params.id;
    const cube = await cubeServices.getById(id).lean();
    cube.isOwner = cube.owner_id == req.user._id;

    res.render('details', cube)
});

router.get('/attach/accessory/:id', isAuth, async (req, res) => {
    const cubeId = req.params.id;
    const cube = await cubeServices.getByIdWithAvailableAcc(cubeId);

    res.render('attach', { ...cube });
});

router.post('/attach/accessory/:id', isAuth, async (req, res) => {
    const cubeId = req.params.id;
    const accId = req.body.accessories;

    await cubeServices.attach(cubeId, accId);
    await accessoryServices.attach(accId, cubeId);

    res.redirect(`/attach/accessory/${cubeId}`);
});

router.get('/cube/:id/edit', isAuth, async (req, res) => {
    const cubeId = req.params.id;
    const cube = await cubeServices.getById(cubeId).lean();
    cube.options = getDifficulties(cube.difficulty);

    res.render('edit', { ...cube });
});

router.post('/cube/:id/edit', isAuth, async (req, res) => {
    const updatedCube = req.body;
    const cubeId = req.params.id;
    const userId = req.user._id;
    
    await cubeServices.update(cubeId, updatedCube, userId);

    res.redirect(`/cube/details/${cubeId}`);
});

router.get('/cube/:id/delete', async (req, res) => { 
    const cubeId = req.params.id;
    const userId = req.user._id;

    await cubeServices.delete(cubeId, userId);

    res.redirect('/');
});


module.exports = router;