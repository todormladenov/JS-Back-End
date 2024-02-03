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

router.post('/user/register', async (req, res) => {
    const { email, password, rePassword } = req.body;

    const token = await userServices.register(email, password, rePassword);

    res.cookie('auth', token);
    res.redirect('/');
});

router.get('/user/logout', (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
});

module.exports = router;