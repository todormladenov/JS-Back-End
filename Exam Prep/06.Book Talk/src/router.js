const router = require('express').Router();
const homeController = require('./controllers/homeController');
const userController = require('./controllers/userController');
const bookController = require('./controllers/bookController');

router.use(homeController);
router.use('/user', userController);
router.use('/book', bookController);

router.get('*', (req, res) => {
    res.render('404');
});

module.exports = router;