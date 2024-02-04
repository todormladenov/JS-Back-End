const Cast = require('../models/Cast');
const Movie = require('../models/Movie');
const User = require('../models/User');

exports.create = async (movieData, userId) => {
    const movie = await Movie.create(movieData);

    await User.findByIdAndUpdate(userId, { $push: { movies: movie._id } });

    return movie;
};

exports.getAll = () => Movie.find();

exports.getById = (id) => Movie.findById(id).populate('cast');

exports.attach = async (movieId, castId, userId) => {
    const movie = await Movie.findById(movieId);

    if (!movie) {
        throw new Error('Movie doesn\'t exist');
    }

    if (movie.cast.includes(castId)) {
        throw new Error('Cast already added');
    }

    if (userId != movie.owner_id) {
        throw new Error('Unauthorize to edit this movie');

    }

    await Cast.findByIdAndUpdate(castId, { $push: { movies: movieId } });
    return await Movie.findByIdAndUpdate(movieId, { $push: { cast: castId } });
};

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

exports.update = async (movieId, movieData, userId) => {
    const movie = Movie.findById(movieData);

    if (!movie) {
        throw new Error('Movie doesn\'t exist');
    }

    if (movie.owner_id != userId) {
        throw new Error('Unauthorize to edit this movie');
    }

    return await Movie.findByIdAndUpdate(movieId, movieData);
};

exports.delete = async (movieId, userId) => {
    const movie = Movie.findById(movieData);

    if (!movie) {
        throw new Error('Movie doesn\'t exist');
    }

    if (movie.owner_id != userId) {
        throw new Error('Unauthorize to delete this movie');
    }

    await User.findByIdAndUpdate(userId, { $pull: { movies: movieId } });

    return await Movie.findByIdAndDelete(movieId);
};