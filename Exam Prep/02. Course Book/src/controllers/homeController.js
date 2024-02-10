const router = require('express').Router();
const courseServices = require('../services/courseServices');

router.get('/', async (req, res) => {
    const courses = await courseServices.getLastThree().lean();
    res.render('home', { courses });
});

module.exports = router;