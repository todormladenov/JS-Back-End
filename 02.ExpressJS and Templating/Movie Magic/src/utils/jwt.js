const jwt = require('jsonwebtoken');

function sign(payload, secret, options = {}) {
    const promise = new Promise((resolve, reject) => {
        jwt.sign(payload, secret, options, (err, token) => {
            if (err) {
                return reject(err);
            }

            return resolve(token)
        })
    });

    return promise
}

function verify(token, secret, options = {}) {
    const promise = new Promise((resolve, reject) => {
        jwt.verify(token, secret, options, (err, token) => {
            if (err) {
                return reject(err);
            }

            return resolve(token)
        })
    });

    return promise
} 

module.exports = {
    sign,
    verify
}