const router = require('express').Router();
const userServices = require('../services/userServices');
const { getErrorMessage } = require('../utils/error');

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', async (req, res) => {
    const userData = req.body;

    try {
        const token = await userServices.register(userData);

        res.cookie('auth', token);
        res.redirect('/');
    } catch (error) {
        res.render('register', { ...userData, error: getErrorMessage(error) });
    }

});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', async (req, res) => {
    const userData = req.body;

    try {
        const token = await userServices.login(userData);

        res.cookie('auth', token);
        res.redirect('/');
    } catch (error) {
        res.render('login', { ...userData, error: getErrorMessage(error) });
    }
});

router.get('/logout', (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
});

module.exports = router;