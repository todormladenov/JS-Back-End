const router = require('express').Router();
const userServices = require('../services/userServices');

router.get('/user/login', (req, res) => {
    res.render('user/login');
});

router.post('/user/login', async (req, res) => {
    const { email, password } = req.body;

    const token = await userServices.login(email, password);

    res.cookie('auth', token);
    res.redirect('/');
});

router.get('/user/register', (req, res) => {
    res.render('user/register');
});

module.exports = router;