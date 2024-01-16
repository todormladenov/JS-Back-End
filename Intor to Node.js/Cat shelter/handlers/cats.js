const fs = require('fs');
const path = require('path');
const qs = require('querystring');
const formidable = require('formidable');
const cats = require('../data/cats')
const breeds = require('../data/breeds');

module.exports = (req, res) => {

    if (req.url === '/cats/add-cat' && req.method === 'GET') {

        fs.readFile(path.join(__dirname, '../views/addCat.html'), (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-type': 'text/plain' });
                res.end('Error!');
            } else {
                res.writeHead(200, { 'Content-type': 'text/html' });
                const catBreedsPlaceHolder = breeds.map(b => `<option value="${b.breed}">${b.breed}</option>`).join('');
                const updatedData = data.toString().replace('{{catBreeds}}', catBreedsPlaceHolder);
                res.write(updatedData);
                res.end();
            }
        });

    } else if (req.url === '/cats/add-cat' && req.method === 'POST') {
        const form = new formidable.IncomingForm();

        form.parse(req, (err, fields) => {
            if (err) {
                res.writeHead(404, { 'Content-type': 'text/plain' });
                res.end('Error!');
            }

            const id = cats[cats.length - 1].id + 1;
            const name = fields.name[0]
            const description = fields.description[0];
            const img = fields.img[0];
            const breed = fields.breed[0];

            cats.push({ id, name, breed, description, img });
            fs.writeFile(path.join(__dirname, '../data/cats.json'), JSON.stringify(cats), (err) => {
                if (err) {
                    res.writeHead(404, { 'Content-type': 'text/plain' });
                    res.end('Error!');
                } else {
                    res.writeHead(302, { 'Location': '/' });
                    res.end();
                }
            });
        });

    } else if (req.url === '/cats/add-breed' && req.method === 'GET') {

        fs.readFile(path.join(__dirname, '../views/addBreed.html'), (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-type': 'text/plain' });
                res.end('Error!');
            } else {
                res.writeHead(200, { 'Content-type': 'text/html' });
                res.write(data);
                res.end();
            }
        });

    } else if (req.url === '/cats/add-breed' && req.method === 'POST') {
        const form = new formidable.IncomingForm();

        form.parse(req, (err, fields) => {

            if (err) {
                res.writeHead(404, { 'Content-type': 'text/plain' });
                res.end('Error!');
            }

            const breed = fields.breed[0];

            breeds.push({ breed });
            fs.writeFile(path.join(__dirname, '../data/breeds.json'), JSON.stringify(breeds), (err) => {
                if (err) {
                    res.writeHead(404, { 'Content-type': 'text/plain' });
                    res.end('Error!');
                } else {
                    res.writeHead(302, { 'Location': '/' });
                    res.end();
                }
            });
        });

    } else if (req.url.includes('/cats/shelter-cat') && req.method === 'GET') {

        fs.readFile(path.join(__dirname, '../views/catShelter.html'), (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-type': 'text/plain' });
                res.end('Error!');
            } else {
                res.writeHead(200, { 'Content-type': 'text/html' });
                const catId = Number(req.url.substring(18));
                if (isNaN(catId)) {
                    return res.end();
                }

                const foundCat = cats.find(c => c.id === catId);

                const updatedData = Object.keys(foundCat).reduce((acc, k) => {
                    return acc.replace(`{{${k}}}`, foundCat[k]);
                }, data.toString())

                res.write(updatedData);
                res.end();
            }
        });
    } else if (req.url.includes('/cats/shelter-cat') && req.method === 'POST') {
        const catId = Number(req.url.substring(18));
        if (isNaN(catId)) {
            return res.end();
        }

        const foundCat = cats.find(c => c.id === catId);
        const indexOfCat = cats.indexOf(foundCat);
        cats.splice(indexOfCat, 1);

        fs.writeFile(path.join(__dirname, '../data/cats.json'), JSON.stringify(cats), (err) => {
            if (err) {
                res.writeHead(404, { 'Content-type': 'text/plain' });
                res.end('Error!');
            } else {
                res.writeHead(302, { 'Location': '/' });
                res.end();
            }
        });
    } else if (req.url.includes('/cats/edit-cat') && req.method === 'GET') {
        fs.readFile(path.join(__dirname, '../views/editCat.html'), (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-type': 'text/plain' });
                res.write('Error');
                res.end();
            }

            const catId = Number(req.url.substring(15));
            if (isNaN(catId)) {
                return res.end();
            }

            const foundCat = cats.find(c => c.id === catId);
            let updatedData = Object.keys(foundCat).reduce((acc, k) => {
                return acc.replace(`{{${k}}}`, foundCat[k]);
            }, data.toString());

            const catBreedsPlaceHolder = breeds.map(b =>
                `<option value="${b.breed}" ${b.breed === foundCat.breed ? "selected" : ''}>${b.breed}</option>`)
                .join('');

            updatedData = updatedData.replace('{{catBreeds}}', catBreedsPlaceHolder);
            res.writeHead(200, { 'Content-type': 'text/html' });
            res.write(updatedData);
            res.end();
        });
    } else if (req.url.includes('/cats/edit-cat') && req.method === 'POST') {
        const form = new formidable.IncomingForm();

        const catId = Number(req.url.substring(15));
        if (isNaN(catId)) {
            return res.end();
        }

        const foundCat = cats.find(c => c.id === catId);
        const indexOfCat = cats.indexOf(foundCat);

        form.parse(req, (err, fields) => {
            if (err) {
                res.writeHead(404, { 'Content-type': 'text/plain' });
                res.end('Error!');
            }

            const editedCat = {
                id: catId,
                name: fields.name[0],
                description: fields.description[0],
                img: fields.img[0],
                breed: fields.breed[0],
            };

            cats.splice(indexOfCat, 1, editedCat);
            fs.writeFile(path.join(__dirname, '../data/cats.json'), JSON.stringify(cats), (err) => {
                if (err) {
                    res.writeHead(404, { 'Content-type': 'text/plain' });
                    res.end('Error!');
                } else {
                    res.writeHead(302, { 'Location': '/' });
                    res.end();
                }
            });
        });
    } else if (req.url.includes('/search') && req.method === 'GET') {
        fs.readFile(path.join(__dirname, '../views/index.html'), (err, data) => {

            if (err) {
                res.writeHead(404, { 'Content-type': 'text/plain' });
                res.end('Error!');
            }

            const queryString = req.url.substring(8)
            const parsedObj = qs.parse(queryString);
            const search = parsedObj.t;

            const foundCats = cats.filter(cat => {
                for (let key of Object.keys(cat)) {
                    if (key !== 'img' && key !== 'id' && cat[key].toLowerCase().includes(search)) {
                        return true;
                    }
                }
                return false;
            });

            res.writeHead(200, { 'Content-type': 'text/html' });

            const catsResult = foundCats.map(c => catTemplate(c)).join('\n');
            const updatedData = data.toString().replace('{{cats}}', catsResult || '<h1>No Results</h1>');
            res.write(updatedData);
            res.end();

        });

    } else {
        return true;
    }
}

const catTemplate = (cat) => `
<li>
<img src="${cat.img}" alt="Black Cat">
<h3>${cat.name}</h3>
<p><span>Breed: </span>${cat.breed}</p>
<p><span>Description: </span>${cat.description}</p>
<ul class="buttons">
    <li class="btn edit"><a href="/cats/edit-cat/${cat.id}">Change Info</a></li>
    <li class="btn delete"><a href="/cats/shelter-cat/${cat.id}">New Home</a></li>
</ul>
</li>`