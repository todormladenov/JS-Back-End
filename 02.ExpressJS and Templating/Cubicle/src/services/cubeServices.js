const cubes = require('../config/data');

exports.getAll = () => {
    return cubes.slice();
};