const cookieParser = require('cookie-parser');
const express = require('express');
const path = require('path');

function configExpress(app) {
    app.use(express.static(path.join(__dirname, '..', 'public')));
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());

    return app;
}

module.exports = configExpress;