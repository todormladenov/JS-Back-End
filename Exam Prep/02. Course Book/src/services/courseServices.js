const Course = require('../models/Course');

exports.create = (courseData) => Course.create(courseData);

exports.getLastThree = () => Course.find().sort({ createdAt: -1 }).limit(3);

exports.getAll = () => Course.find();