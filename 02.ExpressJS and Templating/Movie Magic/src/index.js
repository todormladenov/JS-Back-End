const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes');
const configHandlebars = require('./config/configHandlebars');
const configExpress = require('./config/configExpress');

const app = express();
const port = 3000;

configHandlebars(app);
configExpress(app);


app.use(router);

mongoose.connect('mongodb://127.0.0.1:27017/magic-movies')
    .then(() => console.log('DB is Connected'));

app.listen(port, () => console.log('Server is listening on port 3000...'));