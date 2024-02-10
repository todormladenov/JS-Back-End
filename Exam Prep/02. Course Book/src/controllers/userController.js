const userServices = require('../services/userServices');
const { getErrorMessage } = require('../utils/error');

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
        const message = getErrorMessage(error);
        res.render('register', {...userData, error: message})
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
        const message = getErrorMessage(error);
        res.render('login', {...userData, error: message});
    }
});

router.get('/user/logout', async (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
});

module.exports = router;