const { getErrorMessage } = require('../utils/error');
const userServices = require('../services/userServices');
const { isGuest } = require('../middlewares/authMiddleware');

const router = require('express').Router();

router.get('/user/register', isGuest, (req, res) => {
    res.render('register');
});

router.post('/user/register', isGuest, async (req, res) => {
    const userData = req.body;

    try {
        const token = await userServices.register(userData);

        res.cookie('auth', token);
        res.redirect('/');
    } catch (error) {
        res.render('register', { ...userData, error: getErrorMessage(error) });
    }
});

router.get('/user/login', isGuest, (req, res) => {
    res.render('login');
});

router.post('/user/login', isGuest, async (req, res) => {
    const userData = req.body;

    try {
        const token = await userServices.login(userData);

        res.cookie('auth', token);
        res.redirect('/');
    } catch (error) {
        res.render('login', { ...userData, error: getErrorMessage(error) });
    }
});

router.get('/user/logout', (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
});

module.exports = router;