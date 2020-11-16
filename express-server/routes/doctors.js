/*
    Doctors routes
    Route: /api/doctors
*/

// Requires Gral
const { Router } = require('express');
const { check } = require('express-validator');
// Requires Controller
const { 
    getDoctors, 
    createDoctor, 
    modifyDoctor, 
    deleteDoctor, 
    getDoctorById
} = require('../controllers/doctors');
// Requires custom middleware
const { fieldValidator } = require('../middlewares/fields-validator');
const { validateJWT } = require('../middlewares/validate-jwt');

// Routes need
const router = Router();

router.get('/', validateJWT, getDoctors);

router.post('/', [
    // Middlewares
    validateJWT,
    check('name', 'Doctor name is required').not().isEmpty(),
    check('hospital', 'Hospital ref is required').isMongoId(),
    fieldValidator
]
    , createDoctor);

router.put('/:id', [
    // Middlewares
    validateJWT,
    check('name', 'Doctor name is required').not().isEmpty(),
    check('hospital', 'Hospital reference is required').isMongoId(),
    fieldValidator
]
    , modifyDoctor);

router.delete('/:id', [
    // Middlewares
    validateJWT
]
    , deleteDoctor);

router.get('/:id', [
    // Middlewares
    validateJWT
]
    , getDoctorById);

// Routes need
module.exports = router;