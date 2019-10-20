const {Router} = require('express');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false});
const requireLogin = passport.authenticate('local', {session: false});

// Controllers
const authenticationController = require('./controllers/authentication_controller');

const router = new Router();

/**
 * Document routes - route path plus type (GET, POST, etc.)
 * API routes:
 *
**/
router.route('/auth').get(requireAuth, function(req,res,next) {
    console.log('req.user', req.user);
    
    res.send({hi: "there"});
})
router.route('/signup').post(authenticationController.signup);
router.route('/signin').post(requireLogin, authenticationController.signin);

module.exports = router;