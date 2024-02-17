const Book = require('../models/Book');
const User = require('../models/User');

exports.create = (bookData, userId) => Book.create({ ...bookData, owner: userId });

exports.getAll = () => Book.find();

exports.getById = (bookId) => Book.findById(bookId);

exports.wish = async (bookId, userId) => {
    const book = await Book.findByIdAndUpdate(bookId, { $push: { wishList: userId } });
    await User.findByIdAndUpdate(userId, { $push: { wishList: bookId } });

    return book;
} 