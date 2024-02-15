const router = require('express').Router();
const homeController = require('./controllers/homeController');
const userController = require('./controllers/userController');
const animalController = require('./controllers/animalController');

router.use(homeController);
router.use(userController);
router.use(animalController);

router.get('*', (req, res) => {
    res.render('404');
});

module.exports = router