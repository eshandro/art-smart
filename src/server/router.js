const {Router} = require('express');

// Controllers
const SignupController = require('./controllers/signup_controller');

const router = new Router();

/**
 * Document routes - route path plus type (GET, POST, etc.)
 * API routes:
 *
**/
router.route('/signup').post(SignupController.signup);

module.exports = router;