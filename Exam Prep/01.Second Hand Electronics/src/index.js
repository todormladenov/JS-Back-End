const express = require('express');
const configExpress = require('./config/configExpress');
const configHandlebars = require('./config/configHandlebars');

const app = express();

configExpress(app);


app.listen(3000, () => console.log('Server is listening on port 3000'));