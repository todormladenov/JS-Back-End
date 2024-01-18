const router = require('express').Router();

router.get('/movie/create', (req, res) => {
    res.render('movieCreate');
});

module.exports = router;