const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {

    if (req.url === '/styles/site.css') {
        fs.readFile(path.join(__dirname, '../content/styles/site.css'), (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-type': 'text/plain' });
                res.end('Error!');
            } else {
                res.writeHead(200, { 'Content-type': 'text/css' });
                res.write(data);
                res.end();
            }
        });
    } else {
        return true;
    }

}