const router = require('express').Router();
const courseServices = require('../services/courseServices');

router.get('/', async (req, res) => {
    const courses = await courseServices.getLastThree().lean();
    res.render('home', { courses });
});

router.get('/404', (req, res) => {
    res.render('404');
});

module.exports = router;