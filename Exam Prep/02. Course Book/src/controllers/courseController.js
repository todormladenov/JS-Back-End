const { isAuth } = require('../middlewares/authMiddleware');
const courseServices = require('../services/courseServices');
const { getErrorMessage } = require('../utils/error');

const router = require('express').Router();

router.get('/course/create', isAuth, (req, res) => {
    res.render('create');
});

router.post('/course/create', isAuth, async (req, res) => {
    const courseData = req.body;
    const userId = req.user._id;
    courseData.owner = userId;

    try {
        await courseServices.create(courseData, userId);
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

router.get('/course/sign/:id', isAuth, async (req, res) => {
    const courseId = req.params.id;
    const userId = req.user._id;

    try {
        await courseServices.signUp(courseId, userId);
        res.redirect(`/course/details/${courseId}`);
    } catch (error) {
        const message = getErrorMessage(error);
        res.render('404', { error: message });
    }
});

router.get('/course/delete/:id', isAuth, async (req, res) => {
    const courseId = req.params.id;

    try {
        await courseServices.delete(courseId);
        res.redirect('/courses');
    } catch (error) {
        const message = getErrorMessage(error);
        res.render('404', { error: message });
    }
});

router.get('/course/edit/:id', isAuth, async (req, res) => {
    try {
        const course = await courseServices.getById(req.params.id);
        res.render('edit', {...course});
    } catch (error) {
        const message = getErrorMessage(error);
        res.render('404', { error: message });
    }
});

router.post('/course/edit/:id', isAuth, async (req, res) => {
    const courseData = req.body;
    const courseId = req.params.id;

    try {
        await courseServices.update(courseData, courseId);
        res.redirect(`/course/details/${courseId}`);
    } catch (error) {
        const message = getErrorMessage(error);
        res.render('edit', { ...courseData, error: message });
    }
});

module.exports = router;