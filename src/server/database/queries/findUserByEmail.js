const User = require('../models/user');

function findUserByEmail(email) {
    return User.findOne({email:email})
        .then(user => {return user; })
        .catch(err => {return err; })
};

module.exports = findUserByEmail;