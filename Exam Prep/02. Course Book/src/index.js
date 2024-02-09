const express = require('express');
const { configExpress } = require('./config/configExpress');
const { configHandlebars } = require('./config/configHandlebars');
const router = require('./router');
const mongoose = require('mongoose');

const port = 3000;
const app = express();

configExpress(app);
configHandlebars(app);

app.use(router);

mongoose.connect('mongodb://127.0.0.1:27017/course-book')
    .then(() => console.log('DB is connected'));

app.listen(port, () => console.log('Server is listening'));