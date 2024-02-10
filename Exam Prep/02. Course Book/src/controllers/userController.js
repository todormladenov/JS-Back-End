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

module.exports = router;