const Electronics = require('../models/Electronics');

exports.getAll = () => Electronics.find();

exports.create = async (userId, offerData) => {
    const isEmpty = Object.values(offerData).some(el => el == '');

    if (isEmpty) {
        throw new Error('All fields are required');
    }

    offerData.owner = userId;

    return await Electronics.create(offerData);
}