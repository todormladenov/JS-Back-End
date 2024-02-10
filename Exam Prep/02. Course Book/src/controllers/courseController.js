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

router.get('/courses', async (req, res) => {
    const courses = await courseServices.getAll().lean();
    res.render('catalog', { courses });
});

router.get('/course/details/:id', async (req, res) => {
    const courseId = req.params.id;
    const userId = req.user?._id;

    try {
        const course = await courseServices.getById(courseId, userId);
        res.render('details', { ...course })
    } catch (error) {
        const message = getErrorMessage(error);
        res.render('404', { error: message });
    }
});

module.exports = router;