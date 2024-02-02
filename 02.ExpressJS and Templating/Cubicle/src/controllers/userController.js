const router = require('express').Router();

router.get('/user/login', (req, res) => {
    res.render('user/login');
});

module.exports = router;