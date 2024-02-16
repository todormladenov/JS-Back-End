const Game = require('../models/Game');
const User = require('../models/User');

exports.create = (gameData) => Game.create(gameData);

exports.getAll = () => Game.find();

exports.getById = (gameId) => Game.findById(gameId);

exports.buy = (gameId, userId) => Game.findByIdAndUpdate(gameId, { $push: { boughtBy: userId } });

exports.delete = (gameId) => Game.findByIdAndDelete(gameId);

exports.update = (gameId, gameData) => Game.findByIdAndUpdate(gameId, gameData, { runValidators: true }); 