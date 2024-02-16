const Game = require('../models/Game');

exports.create = (gameData) => Game.create(gameData);

exports.getAll = () => Game.find();

exports.getById = (gameId) => Game.findById(gameId);

exports.buy = (gameId, userId) => Game.findByIdAndUpdate(gameId, { $push: { boughtBy: userId } });