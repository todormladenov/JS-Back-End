const Creature = require("../models/Creature");
const User = require("../models/User");

exports.create = async (creatureData, userId) => {
    const creature = await Creature.create({
        ...creatureData,
        owner: userId
    });

    await User.findByIdAndUpdate(userId, { $push: { creatures: creature._id } });

    return creature;
};

exports.getAll = () => Creature.find();

exports.getByIdPopulated = (creatureId) => Creature.findById(creatureId).populate('votes').populate('owner');

exports.vote = (creatureId, userId) => Creature.findByIdAndUpdate(creatureId, { $push: { votes: userId } });

exports.getById = (creatureId) => Creature.findById(creatureId);

exports.update = (creatureData, creatureId) => Creature.findByIdAndUpdate(creatureId, creatureData, { runValidators: true });