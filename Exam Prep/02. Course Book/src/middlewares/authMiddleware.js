const { SECRET } = require('../config/config');
const jwt = require('../utils/jwt');

exports.auth = async (req, res, next) => {
    const token = req.cookies.auth;

    if (!token) {
        return next();
    }

    try {
        const decodedToken = await jwt.verify(token, SECRET);
        
        req.user = decodedToken;
        res.locals.isAuthenticated = true;

        next();
    } catch (error) {
        res.clearCookie('auth');
        res.redirect('/user/login');
    }
};

exports.isAuth = (req, res, next) => {
    if (!req.user) {
        return res.redirect('/user/login');
    }

    next();
}