const Movie = require('../models/Movie');

exports.create = (movieData) => Movie.create(movieData);

exports.getAll = () => Movie.find();

exports.getById = (id) => Movie.findById(id);

exports.attach = (movieId, castId) => Movie.findByIdAndUpdate(movieId, { $push: { cast: castId }});

exports.search = (title, genre, year) => {
    let result = {};

    if (title) {
        result.title = new RegExp(title, 'i');
    }

    if (genre) {
        result.genre = genre.toLowerCase();
    }

    if (year) {
        result.year = year;
    }

    return Movie.find(result);
}