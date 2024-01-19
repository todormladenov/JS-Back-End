const express = require('express');
const configHandlebars = require('./config/configHandlebars');
const configExpress = require('./config/configExpress');
const router = require('./routes');

const app = express();
const port = 3000;

configHandlebars(app);
configExpress(app);

app.use(router);

app.listen(port, console.log(`Server is listening on port ${port}...`));