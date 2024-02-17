const cookieParser = require('cookie-parser');
const express = require('express');
const path = require('path');
const { auth } = require('../middlewares/authMiddleware');

module.exports = (app) => {
    app.use(express.static(path.join(__dirname, '..', 'static')));
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(auth);
};