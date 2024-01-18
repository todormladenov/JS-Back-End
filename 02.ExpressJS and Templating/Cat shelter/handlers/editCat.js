const cats = require('../data/cats');
const fs = require('fs/promises');
const path = require('path');

function view(req, res) {
    const catId = Number(req.params.id);
    const foundCat = cats.find(c => c.id === catId);
    res.render('editCat', foundCat);
}

function edit(req, res) {
    const id = Number(req.params.id);
    const name = req.body.name;
    const description = req.body.description;
    const img = req.body.img;
    const breed = req.body.breed;

    const foundCat = cats.find(c => c.id === id);
    const indexOfCat = cats.indexOf(foundCat);

    cats.splice(indexOfCat, 1, { id, name, description, img, breed });

    fs.writeFile(path.join(__dirname, '..', 'data', 'cats.json'), JSON.stringify(cats, null, 2));
    res.redirect('/');

}

module.exports = {
    view,
    edit
}