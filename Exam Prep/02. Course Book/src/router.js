const router = require('express').Router();
const homeController = require('./controllers/homeController');
const userController = require('./controllers/userController');
const courseController = require('./controllers/courseController');

router.use(homeController);
router.use(userController);
router.use(courseController);

module.exports = router;