// Pull in Database queries as needed
const findUserByEmail = require('../database/queries/findUserByEmail');
const createNewUser = require('../database/queries/createNewUser');

const jwt = require("jwt-simple");

const config = require('../config');
const secret = process.env.SECRET || config.secret;

function tokenForUser(user) {
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp }, secret);
}

module.exports = {
    signup(req,res, next) {
        console.log('req.body:', req.body);
        const email = req.body.email;
        const password = req.body.password;
        if (!email || !password) {
            return res.status(422).send({ error: "An Email and a Password must be provided." })
        } else {
            // Add email and password validation here
            findUserByEmail(email)
                .then(user => {
                    return user;
                })
                .catch(err => {
                    console.log('err in findUserByEmail in signup_controller:', err);
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
    
                createNewUser(newUser)
                .then(result => {
                    res.json({ token: tokenForUser(result)});
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
    },
    signin(req,res,next) {
        // authentication handled by middleware using passport
        // may need to auth error handling here
        console.log('req.user in signin authentication_controller:', req.user);
        res.send({token: tokenForUser(req.user) });
    }
}