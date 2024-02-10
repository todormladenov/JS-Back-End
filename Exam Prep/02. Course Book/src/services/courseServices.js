const Course = require('../models/Course');

exports.create = (courseData) => Course.create(courseData);

exports.getLastThree = () => Course.find().sort({ createdAt: -1 }).limit(3);

exports.getAll = () => Course.find();

exports.getById = async (courseId, userId) => {
    const course = await Course.findById(courseId).populate('owner').populate('signUpList').lean();

    if (userId) {
        course.isUser = true;
        course.isOwner = course.owner._id == userId;
        course.isSignUp = course.signUpList.some(user => user._id == userId);
    }

    return course;
};