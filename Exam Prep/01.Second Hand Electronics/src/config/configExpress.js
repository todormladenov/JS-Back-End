const cookieParser = require('cookie-parser');
const express = require('express');
const path = require('path');
const { auth } = require('../middlewares/authMIddleware');

function configExpress(app) {
    app.use(express.static(path.join(__dirname, '..', 'public')));
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(auth);
}

module.exports = configExpress;