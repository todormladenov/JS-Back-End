const Electronics = require('../models/Electronics');

exports.getAll = () => Electronics.find();

exports.create = async (userId, offerData) => {
    const isEmpty = Object.values(offerData).some(el => el == '');

    if (isEmpty) {
        throw new Error('All fields are required');
    }

    offerData.owner = userId;

    return await Electronics.create(offerData);
};

exports.getById = async (offerId, userId) => {
    const electronic = await Electronics.findById(offerId).populate('buyingList').lean();

    if (userId) {
        electronic.isUser = true;
        electronic.isOwner = electronic.owner == userId;
        electronic.isBought = electronic.buyingList.some(user => user._id == userId);
    }

    return electronic
};

exports.delete = (offerId) => Electronics.findByIdAndDelete(offerId);

exports.update = async (offerData, offerId) => {
    const isEmpty = Object.values(offerData).some(el => el == '');

    if (isEmpty) {
        throw new Error('All fields are required');
    }

    const electronic = await Electronics.findById(offerId);

    Object.assign(electronic, offerData);

    return await electronic.save();
};

exports.buy = (offerId, userId) => Electronics.findByIdAndUpdate(offerId, { $push: { buyingList: userId } });

exports.search = (name, type) => {
    let query = {};

    if (name) {
        query.name = new RegExp(name, 'i');
    }

    if (type) {
        query.type = new RegExp(type, 'i');
    }

    return Electronics.find(query);
}