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