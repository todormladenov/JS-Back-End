const Course = require('../models/Course');
const User = require('../models/User');

exports.create = async (courseData, userId) => {
    const course = await Course.create(courseData);
    await User.findByIdAndUpdate(userId, { $push: { ownCourses: course._id } });

    return course;
}

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

exports.signUp = async (courseId, userId) => {
    await User.findByIdAndUpdate(userId, { $push: { signUpCourses: courseId } });
    return Course.findByIdAndUpdate(courseId, { $push: { signUpList: userId } });
}

exports.delete = (courseId) => Course.findByIdAndDelete(courseId);

exports.update = async (courseData, courseId) => {
    const course = await Course.findById(courseId);

    Object.assign(course, courseData);

    return course.save();
};