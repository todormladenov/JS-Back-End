const Accessory = require('../models/Accessory');

exports.create = (newAccessory) => Accessory.create(newAccessory);

exports.getAll = () => Accessory.find();

exports.attach = (accId, cubeId) => Accessory.findByIdAndUpdate(accId, { $push: { cubes: cubeId } });

exports.getById = (id) => Accessory.findById(id).populate('cubes');

exports.search = (name) => Accessory.find({ name: new RegExp(name, 'i') }); 