const animalServices = require('../services/animalServices');

exports.isDonated = async (req, res, next) => {
    const animal = await animalServices.getAnimalById(req.params.id);

    const isDonated = animal.donations.some(id => id == req.user._id);

    if (isDonated) {
        return res.redirect('/');
    }

    next();
};

exports.isOwner = async (req, res, next) => {
    const animal = await animalServices.getAnimalById(req.params.id).lean();

    if (animal.owner != req.user._id) {
        return res.redirect('/');
    }

    req.animal = animal;
    next();
};