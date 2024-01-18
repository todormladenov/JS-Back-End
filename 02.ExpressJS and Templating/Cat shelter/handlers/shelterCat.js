const cats = require('../data/cats');
const fs = require('fs/promises');
const path = require('path');

function view(req, res) {
    const catId = Number(req.params.id);
    const foundCat = cats.find(c => c.id === catId);
    res.render('shelterCat', foundCat);
}

function shelter(req, res) {
    const catId = Number(req.params.id);
    const foundCat = cats.find(c => c.id === catId);
    const indexOfCat = cats.indexOf(foundCat);
    cats.splice(indexOfCat, 1);

    fs.writeFile(path.join(__dirname, '..', 'data', 'cats.json'), JSON.stringify(cats, null, 2));
    res.redirect('/');
}

module.exports = {
    view,
    shelter
}