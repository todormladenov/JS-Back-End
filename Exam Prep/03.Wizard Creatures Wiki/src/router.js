const router = require('express').Router();
const homeController = require('./controllers/homeController');
const userController = require('./controllers/userController');
const creaturesController = require('./controllers/creaturesController');

router.use(homeController);
router.use(userController);
router.use(creaturesController);

module.exports = router;