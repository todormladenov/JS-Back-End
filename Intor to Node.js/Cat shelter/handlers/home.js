const cats = require('../data/cats')
const fs = require('fs');
const path = require('path');
const formidable = require('formidable');

module.exports = (req, res) => {
    if (req.url === '/' && req.method === 'GET') {
        fs.readFile(path.join(__dirname, '../views/index.html'), (err, data) => {

            if (err) {
                res.writeHead(404, { 'Content-type': 'text/plain' });
                res.end('Error!');
            } else {
                res.writeHead(200, { 'Content-type': 'text/html' });
                const catsResult = cats.map(cat => catTemplate(cat)).join('\n');
                const updatedData = data.toString().replace('{{cats}}', catsResult);
                res.write(updatedData);

                res.end();
            }

        });

    } else if (req.url === '/' && req.method === 'POST') {
        const form = new formidable.IncomingForm();

        form.parse(req, (err, fields) => {

            if (err) {
                res.writeHead(404, { 'Content-type': 'text/plain' });
                return res.end('Error!');
            }

            const search = fields.search[0].toLowerCase();
            
            res.writeHead(302, { 'Location': `/search?t=${search}` });
            res.end();
        })
    } else {
        return true

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