const { isAuth } = require('../middlewares/authMiddleware');
const courseServices = require('../services/courseServices');
const { getErrorMessage } = require('../utils/error');

const router = require('express').Router();

router.get('/course/create', isAuth, (req, res) => {
    res.render('create');
});

router.post('/course/create', isAuth, async (req, res) => {
    const courseData = req.body;
    courseData.owner = req.user._id;

    try {
        await courseServices.create(courseData);
        res.redirect('/');
    } catch (error) {
        const message = getErrorMessage(error);
        res.render('create', { ...courseData, error: message });
    }
});

module.exports = router;