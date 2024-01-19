const cubes = require('../config/data');

exports.getAll = () => {
    return cubes.slice();
};

exports.addCube = (newCube) => {
    newCube.id = cubes[cubes.length - 1].id + 1;
    cubes.push(newCube);
};

exports.getById = (id) => {
    return cubes.find(c => c.id == id);
};

exports.search = (name, from, to) => {
    let result = cubes.slice();

    if (name) {
        result = result.filter(c => c.name.toLowerCase().includes(name.toLowerCase()));
    }

    if (from) {
        result = result.filter(c => c.difficulty >= from);
    }

    if (to) {
        result = result.filter(c => c.difficulty <= to);
    }

    return result;
};