const handlebars = require('express-handlebars');
const path = require('path');

exports.configHandlebars = (app) => {
    app.engine('hbs', handlebars.engine({ extname: 'hbs' }));
    app.set('view engine', 'hbs');
    app.set('views', path.join(__dirname, '..', 'views'))
};