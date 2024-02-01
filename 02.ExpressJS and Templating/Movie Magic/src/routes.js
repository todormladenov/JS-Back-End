const router = require('express').Router();

const homeController = require('./controllers/homeController');
const movieController = require('./controllers/movieController');
const castController = require('./controllers/castController');
const userController = require('./controllers/userController');

router.use(homeController);
router.use(movieController);
router.use(castController);
router.use(userController);

router.get('*', (req, res) => {
    res.redirect('/404');
});

module.exports = router;