const router = require('express').Router();
const { isAuth } = require('../middlewares/authMiddleware');
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

router.get('/user/login', (req, res) => {
    res.render('user/login');
});

router.post('/user/login', async (req, res) => {
    const userData = req.body;
    const token = await userServices.login(userData);

    res.cookie('auth', token);
    res.redirect('/');
});

router.get('/user/logout', (req, res) => {
    res.clearCookie('auth');
    res.redirect('/')
});

router.get('/user/posts', isAuth, async (req, res) => {
    const userWithPosts = await userServices.getUserWithMovies(req.user._id).lean();
    res.render('user/posts', { ...userWithPosts });
});

module.exports = router;