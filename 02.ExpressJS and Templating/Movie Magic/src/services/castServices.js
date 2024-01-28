const Cast = require('../models/Cast');

exports.create = (castData) => Cast.create(castData);

exports.getAll = () => Cast.find();

exports.attach = (movieId, castId) => Cast.findByIdAndUpdate(castId, { $push: { movies: movieId }});