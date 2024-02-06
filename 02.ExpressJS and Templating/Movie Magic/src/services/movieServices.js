const Cast = require('../models/Cast');
const Movie = require('../models/Movie');
const User = require('../models/User');
const mongoose = require('mongoose');

exports.create = async (movieData, userId) => {
    const movie = await Movie.create(movieData);

    await User.findByIdAndUpdate(userId, { $push: { movies: movie._id } });

    return movie;
};

exports.getAll = () => Movie.find();

exports.getById = async (id) => {
    id = new mongoose.Types.ObjectId(id);
    const movie = await Movie.findById(id).populate('cast').lean();

    if (!movie) {
        throw new Error('Movie not found');
    }

    return movie;
}

exports.attach = async (movieId, castId, userId) => {
    castId = new mongoose.Types.ObjectId(castId);

    const movie = await this.getById(movieId);
    const cast = await Cast.findById(castId);

    if (!movie) {
        throw new Error('Movie doesn\'t exist');
    }

    if (!cast) {
        throw new Error('Cast doesn\'t exist');
    }

    if (movie.owner_id != userId) {
        throw new Error('You are not the owner of this movie.')
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

exports.getByIdWithAvailableCast = async (movieId, userId) => {
    const movie = await this.getById(movieId);

    if (movie.owner_id != userId) {
        throw new Error('You are not the owner of this movie.')
    }

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
    const movie = await this.getById(movieId);

    if (!movie) {
        throw new Error('Movie doesn\'t exist');
    }

    if (movie.owner_id != userId) {
        throw new Error('Unauthorize to edit this movie');
    }

    Object.assign(movie, movieData);
    
    return await movie.save();
};

exports.delete = async (movieId, userId) => {
    const movie = await this.getById(movieId);

    if (!movie) {
        throw new Error('Movie doesn\'t exist');
    }

    if (movie.owner_id != userId) {
        throw new Error('Unauthorize to delete this movie');
    }

    await Cast.updateMany({ movies: movieId }, { $pull: { movies: movieId } });

    await User.findByIdAndUpdate(userId, { $pull: { movies: movieId } });

    return await Movie.findByIdAndDelete(movieId);
};