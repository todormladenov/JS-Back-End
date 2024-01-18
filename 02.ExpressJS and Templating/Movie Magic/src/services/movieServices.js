const movies = require('../data/movies.json');

exports.getAll = () => {
    return movies.slice();
}