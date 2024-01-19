const express = require('express');
const configHandlebars = require('./config/configHandlebars');

const app = express();
const port = 3000;

configHandlebars(app);

app.get('/', (req, res) => {
    res.render('home')
});

app.listen(port, console.log(`Server is listening on port ${port}...`));