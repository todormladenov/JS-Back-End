const cubes = require('../config/data');

exports.getAll = () => {
    return cubes.slice();
};

exports.addCube = (newCube) => {
    newCube.id = cubes[cubes.length - 1].id + 1;
    cubes.push(newCube);
}