const cats = require('../data/cats')

module.exports = (req, res) => {
    res.render('home', { cats });
}