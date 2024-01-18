const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');
const homeHandler = require('./handlers/home');
const addBreedHandler = require('./handlers/addBreed');
const addCatHandler = require('./handlers/addCat');
const editCatHandler = require('./handlers/editCat');
const shelterCatHandler = require('./handlers/shelterCat');

const app = express();

app.engine('hbs', handlebars.engine({ extname: 'hbs' }));
app.set('view engine', 'hbs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', homeHandler);

app.get('/cats/add-breed', addBreedHandler.view);
app.post('/cats/add-breed', addBreedHandler.add);

app.get('/cats/add-cat', addCatHandler.view);
app.post('/cats/add-cat', addCatHandler.add);

app.get('/edit-cat/:id', editCatHandler.view);
app.post('/edit-cat/:id', editCatHandler.edit);

app.get('/shelter-cat/:id', shelterCatHandler.view);
app.post('/shelter-cat/:id', shelterCatHandler.shelter);

app.listen(3000, () => console.log('Server is listening on port 3000...'));