const cookieParser = require('cookie-parser');
const express = require('express');
const path = require('path');
const { auth } = require('../middlewares/authMiddleware');

exports.configExpress = (app) => {
    app.use(express.static(path.join(__dirname, '..', 'public')));
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(auth);
};