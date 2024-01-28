const router = require('express').Router();
const accessoryServices = require('../services/accessoryServices');

router.get('/accessory/create', (req, res) => {
    res.render('accessory/create')
});

router.post('/accessory/create', async (req, res) => {
    const newAccessory = req.body;

    await accessoryServices.create(newAccessory);

    res.redirect('/')
});

router.get('/accessory', async (req, res) => {
    const accessories = await accessoryServices.getAll().lean();

    res.render('accessory/accessory', { accessories });
});

router.get('/accessory/details/:id', async (req, res) => {
    const accId = req.params.id;
    const accessory = await accessoryServices.getById(accId).lean();

    res.render('accessory/details', { ...accessory });
});

module.exports = router;