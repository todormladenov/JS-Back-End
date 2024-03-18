const express = require('express');
const configExpress = require('./config/configExpress');
const configHandlebars = require('./config/configHandlebars');
const router = require('./router');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

configExpress(app);
configHandlebars(app);

mongoose.connect('mongodb://127.0.0.1:27017/earth-treasure-vaul')
    .then(() => console.log('DB is connected'));

app.use(router)

app.listen(port, () => console.log(`Server is listening on port ${port}`));