const router = require('express').Router();

router.get('/accessory/create', (req, res) => {
    res.render('accessory/create')
});

module.exports = router;