const Cube = require('../models/Cube');

exports.getAll = () => Cube.find();

exports.addCube = (newCube) => Cube.create(newCube);

exports.getById = (id) => Cube.findById(id);

exports.search = (name, from, to) => {
    let result = {}

    if (name) {
        result.name = new RegExp(name, 'i')
    }

    if (from) {
        result.difficulty = {...result.difficulty, $gte: from}
    }

    if (to) {
        result.difficulty = {...result.difficulty, $lte: to}
    }

    return Cube.find(result);
};