const router = require('express').Router();
const homeController = require('./controllers/homeController');
const userController = require('./controllers/userController');
const stoneController = require('./controllers/stoneController');

router.use(homeController);
router.use('/user', userController);
router.use('/stone', stoneController);

router.get('*', (req, res) => {
    res.render('404');
});

module.exports = router;