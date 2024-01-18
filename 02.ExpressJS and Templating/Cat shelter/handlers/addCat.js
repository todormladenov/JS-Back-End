const breeds = require('../data/breeds');
const cats = require('../data/cats');
const fs = require('fs/promises');
const path = require('path');

function view(req, res) {
    res.render('addCat', { breeds });
}

function add(req, res) {
    const id = cats[cats.length - 1].id + 1;
    const name = req.body.name;
    const description = req.body.description;
    const img = req.body.img;
    const breed = req.body.breed;

    cats.push({ id, name, description, img, breed });

    fs.writeFile(path.join(__dirname, '..', 'data', 'cats.json'), JSON.stringify(cats, null, 2));
    res.redirect('/')
}

module.exports = {
    view,
    add
}