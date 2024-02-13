const router = require('express').Router();
const homeController = require('./controllers/homeController');
const userController = require('./controllers/userController');
const creaturesController = require('./controllers/creaturesController');

router.use(homeController);
router.use(userController);
router.use(creaturesController);

router.get('*', (req, res) => {
    res.render('404');
});

module.exports = router;