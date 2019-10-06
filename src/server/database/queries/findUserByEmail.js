const User = require('../models/user');

function findUserByEmail(email) {
    return User.findOne({email:email})
        .then(user => user)
        .catch(err => err)
};

module.exports = findUserByEmail;