const passport = require('passport');
const {Strategy, ExtractJwt} = require('passport-jwt');
const LocalStrategy = require('passport-local');
const findUserById = require('../database/queries/findUserById');
const findUserByEmail = require('../database/queries/findUserByEmail');
const config = require('../config');

const secret = process.env.SECRET || config.secret;

const localOptions = {usernameField: "email"};

const localLogin = new LocalStrategy(localOptions, function(email, password, done){
    findUserByEmail(email)
    .then(user => {
        console.log('user in localLogin findUserByEmail:', user);
        
        if (!user) return done(null, false);
        user.comparePassword(password, function(err, isMatch) {
            if (err) return done(err);
            if (!isMatch) return done(null, false);
            return done(null, user);
        })
    })
    .catch(err => done(err))
})

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('auth'),
    secretOrKey: secret
};

const jwtLogin = new Strategy(jwtOptions, function(payload, done){
    findUserById(payload.sub)
    .then(user => {
        if (user) {
            return done(null, user)
        } else {
            return done(null, false)
        }
    })
    .catch(err => {
        return done(err, false);
    })
});

passport.use(jwtLogin);
passport.use(localLogin);