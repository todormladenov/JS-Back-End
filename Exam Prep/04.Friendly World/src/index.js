const express = require('express');
const { configExpress } = require('./config/configExpress');

const app = express();
const port = 3000;

configExpress(app);

app.listen(port, () => console.log('Server is listening'));