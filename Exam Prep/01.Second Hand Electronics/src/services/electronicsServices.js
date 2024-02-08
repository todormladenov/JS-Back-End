const Electronics = require('../models/Electronics');

exports.getAll = () => Electronics.find();