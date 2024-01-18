const express = require('express');
const router = require('./routes');
const configHandlebars = require('./config/configHandlebars');
const configExpress = require('./config/configExpress');

const app = express();
const port = 3000;

configHandlebars(app);
configExpress(app);

app.use(router);

app.listen(port, () => console.log('Server is listening on port 3000...'));