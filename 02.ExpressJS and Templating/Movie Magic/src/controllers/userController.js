const router = require('express').Router();
const userServices = require('../services/userServices');

router.get('/user/register', (req, res) => {
    res.render('user/register');
});

router.post('/user/register', async (req, res) => {
    const userData = req.body;

    const token = await userServices.register(userData);
    
    res.cookie('auth', token);
    res.redirect('/');
});

module.exports = router;