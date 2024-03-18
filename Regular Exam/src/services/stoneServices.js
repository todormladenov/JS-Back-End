const Stone = require("../models/Stone");

exports.create = (stoneData, userId) => Stone.create({ ...stoneData, owner: userId });

exports.getAll = () => Stone.find();

exports.getMostRecent = () => Stone.find().sort({ createdAt: -1 }).limit(3);

exports.getById = (stoneId) => Stone.findById(stoneId);

exports.like = (stoneId, userId) => Stone.findByIdAndUpdate(stoneId, { $push: { likedList: userId } });

exports.delete = (stoneId) => Stone.findByIdAndDelete(stoneId);

exports.update = (stoneId, stoneData) => Stone.findByIdAndUpdate(stoneId, stoneData, { runValidators: true });

exports.search = ({ name }) => Stone.find({ name: new RegExp(name, 'i') });