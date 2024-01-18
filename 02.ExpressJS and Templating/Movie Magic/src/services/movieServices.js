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

exports.search = (title, genre, year) => {
    let result = movies.slice();

    if (title) {
        result = result.filter(m => m.title.toLocaleLowerCase().includes(title.toLocaleLowerCase()));
    }

    if (genre) {
        result = result.filter(m => m.genre.toLocaleLowerCase() === genre.toLocaleLowerCase());
    }

    if (year) {
        result = result.filter(m => m.year == year);
    }

    return result;  
}