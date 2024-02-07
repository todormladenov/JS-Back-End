const express = require('express');
const configExpress = require('./config/configExpress');
const configHandlebars = require('./config/configHandlebars');

const app = express();

configExpress(app);
configHandlebars(app);

app.get('/', (req, res) => {
    res.render('home')
});

app.listen(3000, () => console.log('Server is listening on port 3000'));