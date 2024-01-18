const breeds = require('../data/breeds');
const fs = require('fs/promises');
const path = require('path');

function view(req, res) {
    res.render('addBreed');
}

function add(req, res) {
    const breed = req.body.breed;
    breeds.push({ breed });

    fs.writeFile(path.join(__dirname, '..', 'data', 'breeds.json'), JSON.stringify(breeds, null, 2));
    res.redirect('/');
}

module.exports = {
    view,
    add
}