const Animal = require('../models/Animal');
const User = require('../models/User');

exports.create = async (animalData, userId) => {
    const animal = await Animal.create({
        ...animalData,
        owner: userId
    });
    await User.findByIdAndUpdate(userId, { $push: { animals: animal._id } });

    return animal;
};

exports.getAll = () => Animal.find();

exports.getAnimalById = (animalId) => Animal.findById(animalId);

exports.donate = (animalId, userId) => Animal.findByIdAndUpdate(animalId, { $push: { donations: userId } });

exports.edit = (animalId, animalData) => Animal.findByIdAndUpdate(animalId, animalData, { runValidators: true });