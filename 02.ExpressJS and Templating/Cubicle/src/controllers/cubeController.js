const router = require('express').Router();
const cubeServices = require('../services/cubeServices');
const accessoryServices = require('../services/accessoryServices');
const { isAuth } = require('../middlewares/authMiddleware');

router.get('/cube/create', isAuth, (req, res) => {
    res.render('create');
});

router.post('/cube/create', isAuth, async (req, res) => {
    const newCube = req.body;
    await cubeServices.addCube(newCube);

    res.redirect('/');
});

router.get('/cube/details/:id', async (req, res) => {
    const id = req.params.id;
    const cube = await cubeServices.getById(id).lean();

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

module.exports = router;