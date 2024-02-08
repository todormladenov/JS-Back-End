const router = require('express').Router();
const homeController = require('./controllers/homeController');
const userController = require('./controllers/userController');
const electronicsController = require('./controllers/electronicsController');

router.use(homeController);
router.use(userController);
router.use(electronicsController);

module.exports = router;