const movies = require('../data/movies.json');

exports.create = (movieData) => {
    movieData.id = movies[movies.length - 1].id + 1;
    movies.push(movieData);
}

exports.getAll = () => {
    return movies.slice();
}

exports.getById = (id) => {
    return movies.find(m => m.id == id);
}