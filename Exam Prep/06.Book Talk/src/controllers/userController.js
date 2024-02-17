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

module.exports = router;