const Cast = require('../models/Cast');
const Movie = require('../models/Movie');

exports.create = (movieData) => Movie.create(movieData);

exports.getAll = () => Movie.find();

exports.getById = (id) => Movie.findById(id).populate('cast');

exports.attach = (movieId, castId) => Movie.findByIdAndUpdate(movieId, { $push: { cast: castId } });

exports.getByIdWithAvailableCast = async (id) => {
    const movie = await Movie.findById(id).lean();

    const availableCast = await Cast.find({ _id: { $nin: movie.cast } }).lean();

    movie.availableCast = availableCast;

    return movie;
};

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
};

exports.update = (movieId, movieData) => Movie.findByIdAndUpdate(movieId, movieData);