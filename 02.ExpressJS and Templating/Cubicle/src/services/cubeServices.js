const Accessory = require('../models/Accessory');
const Cube = require('../models/Cube');
const User = require('../models/User');

exports.getAll = () => Cube.find();

exports.addCube = async (newCube, userId) => {
    const user = User.findById(userId);

    if (!user) {
        throw new Error('User doesn\'t exist');
    }

    newCube.owner_id = userId;
    const cube = await Cube.create(newCube);

    await User.findByIdAndUpdate(userId, { $push: { cubes: cube._id } });

    return cube;
};

exports.getById = (id) => Cube.findById(id).populate('accessories');

exports.getByIdWithAvailableAcc = async (id) => {
    const cube = await Cube.findById(id).lean();

    const availableAccessories = await Accessory.find({ _id: { $nin: cube.accessories } }).lean();

    cube.availableAccessories = availableAccessories;

    return cube;
}

exports.attach = (cubeId, accId) => Cube.findByIdAndUpdate(cubeId, { $push: { accessories: accId } });

exports.search = (name, from, to) => {
    let result = {};

    if (name) {
        result.name = new RegExp(name, 'i');
    }

    if (from) {
        result.difficulty = { ...result.difficulty, $gte: from };
    }

    if (to) {
        result.difficulty = { ...result.difficulty, $lte: to };
    }

    return Cube.find(result);
};

exports.update = async (cubeId, updatedCube, userId) => {
    const cube = await Cube.findById(cubeId);

    if (!cube) {
        throw new Error('Cube doesn\'t exist');
    }

    if (userId != cube.owner_id) {
        throw new Error('You can\'t update this cube');
    }

    return Cube.findByIdAndUpdate(cubeId, updatedCube);
}