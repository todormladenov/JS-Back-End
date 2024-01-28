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


module.exports = router;