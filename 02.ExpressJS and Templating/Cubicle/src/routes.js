const router = require('express').Router();
const homeController = require('./controllers/homeController');
const cubeController = require('./controllers/cubeController');
const accessoryController = require('./controllers/accessoryController');
const userController = require('./controllers/userController');

router.use(homeController);
router.use(cubeController);
router.use(accessoryController);
router.use(userController);

router.get('*', (req, res) => {
    res.redirect('/404');
})
module.exports = router;