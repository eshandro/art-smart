// Pull in Database queries as needed
const findUserByEmail = require('../database/queries/findUserByEmail');
const createNewUser = require('../database/queries/createNewUser')

module.exports = {
    signup(req,res, next) {
        console.log('req.body:', req.body);
        const email = req.body.email;
        const password = req.body.password;
        findUserByEmail(email)
            .then(user => {
                console.log('user', user);
                return user;
            })
            .catch(err => {
                console.log('err', err);
                return next(err);
            })
        .then(user => {
            if (user) {
                return res.status(422).send({ error: "Email address already in use."})
            }
            // Create a new user
            const newUser = {
                email,
                password
            };
            console.log('newUser in controller', newUser);
            
            createNewUser(newUser)
            .then(user => {
                res.json(user)
            })
            .catch(err => {
                console.log('err in createNewUser controller', err);
                
                next(err);
            })
        })
        .catch(err => {
            return next(err)
        })
    }
}