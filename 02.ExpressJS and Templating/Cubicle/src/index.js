const express = require('express');
const mongoose = require('mongoose');
const configHandlebars = require('./config/configHandlebars');
const configExpress = require('./config/configExpress');
const router = require('./routes');

const app = express();
const port = 3000;

configHandlebars(app);
configExpress(app);

app.use(router);

mongoose.connect('mongodb://127.0.0.1:27017/cubes')
    .then(() => console.log('DB Connected'));

app.listen(port, console.log(`Server is listening on port ${port}...`));