const User = require('../models/user');

function findUserById(id) {
    return User.findById(id)
        .then(user => { return user;})
        .catch(err => { return err; })
}

module.exports = findUserById;