const cookieParser = require('cookie-parser');
const express = require('express');
const path = require('path');
const { auth } = require('../middlewares/authMiddleware');

function configExpress(app) {
    app.use(express.static(path.join(__dirname, '..', 'public')));
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(auth);

    return app;
}

module.exports = configExpress;