const User = require('../models/user');

function createNewUser(newUser) {
    const user = new User ({
        email: newUser.email,
        password: newUser.password
    });
    return user.save()
    .then(user => {
        return user;
    })
    .catch(err => err)
};

module.exports = createNewUser;