const router = require('express').Router();

router.get('/user/register', (req, res) => {
    res.render('user/register');
});

module.exports = router;