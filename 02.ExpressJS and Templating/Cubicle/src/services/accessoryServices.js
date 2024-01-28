const Accessory = require('../models/Accessory');

exports.create = (newAccessory) => Accessory.create(newAccessory);

exports.getAll = () => Accessory.find();

exports.attach = (accId, cubeId) => Accessory.findByIdAndUpdate(accId, { $push: { cubes: cubeId } });