/*
    Users routes
    Route: /api/users
*/

// Requires Gral
const { Router } = require('express');
const { check } = require('express-validator');
// Requires Controller
const { 
    getUsers, 
    createUser, 
    modifyUser, 
    deleteUser 
} = require('../controllers/users');
// Requires custom middleware
const { fieldValidator } = require('../middlewares/fields-validator');
const { validateJWT, 
        validateAdminRole, 
        validateAdminRoleOrSameUser 
} = require('../middlewares/validate-jwt');

// Routes need
const router = Router();

router.get('/', [
    // Middlewares
    validateJWT,
    validateAdminRole
] 
    ,getUsers);

router.post('/', [
    // Middlewares
    check('name', 'name is required').not().isEmpty(),
    check('password', 'password is required').not().isEmpty(),
    check('email', 'email is required').isEmail(),
    fieldValidator
]
    , createUser);

router.put('/:id', [
    // Middlewares
    validateJWT,
    validateAdminRoleOrSameUser,
    check('name', 'name is required').not().isEmpty(),
    check('email', 'email is required').isEmail(),
    check('role', 'role is required').not().isEmpty(),
    fieldValidator
]
    , modifyUser);

router.delete('/:id', [
    // Middlewares
    validateJWT,
    validateAdminRole
]
    , deleteUser);

// Routes need
module.exports = router;