const router = require('express').Router();
const homeController = require('./controllers/homeController');
const cubeController = require('./controllers/cubeController');

router.use(homeController);
router.use(cubeController);

router.get('*', (req, res) => {
    res.redirect('/404');
})
module.exports = router;