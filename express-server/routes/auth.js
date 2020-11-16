/*
    Users routes
    Route: /api/login
*/

// Requires Gral
const { Router } = require('express');
const { check } = require('express-validator');
// Requires Controller
const { login, loginGoogle, renewToken } = require('../controllers/auth');
const { fieldValidator } = require('../middlewares/fields-validator');
const { validateJWT } = require('../middlewares/validate-jwt');


const router = Router();

router.post('/', [
    // Middlewares
    check('email', 'email is required').isEmail(),
    check('password', 'password is required').not().isEmpty(),
    fieldValidator
],
    login
);

router.post('/google', [
    // Middlewares
    check('google_token', 'Google Token is required').not().isEmpty(),
    fieldValidator
],
    loginGoogle
);

router.get('/renew', [
    // Middlewares
    validateJWT
],
    renewToken
);


module.exports = router;