const { getErrorMessage } = require('../utils/error');
const userServices = require('../services/userServices');

const router = require('express').Router();

router.get('/user/register', (req, res) => {
    res.render('register');
});

router.post('/user/register', async (req, res) => {
    const userData = req.body;

    try {
        const token = await userServices.register(userData);

        res.cookie('auth', token);
        res.redirect('/');
    } catch (error) {
        res.render('register', { ...userData, error: getErrorMessage(error) });
    }
});

router.get('/user/login', (req, res) => {
    res.render('login');
});

router.post('/user/login', async (req, res) => {
    const userData = req.body;

    try {
        const token = await userServices.login(userData);

        res.cookie('auth', token);
        res.redirect('/');
    } catch (error) {
        res.render('login', { ...userData, error: getErrorMessage(error) });
    }
});

module.exports = router;