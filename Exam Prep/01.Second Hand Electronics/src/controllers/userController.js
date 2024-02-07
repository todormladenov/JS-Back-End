const router = require('express').Router();

router.get('/user/register', (req, res) => {
    res.render('register')
});


module.exports = router;