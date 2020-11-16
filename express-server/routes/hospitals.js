/*
    Hospitals routes
    Route: /api/hospitals
*/

// Requires Gral
const { Router } = require('express');
const { check } = require('express-validator');
// Requires Controller
const { 
    getHospitals, 
    createHospital, 
    modifyHospital, 
    deleteHospital 
} = require('../controllers/hospitals');
// Requires custom middleware
const { fieldValidator } = require('../middlewares/fields-validator');
const { validateJWT } = require('../middlewares/validate-jwt');

// Routes need
const router = Router();

router.get('/', validateJWT ,getHospitals);

router.post('/', [
    // Middlewares
    validateJWT,
    check('name', 'Hospital name is necessary').not().isEmpty(),
    fieldValidator
]
    , createHospital);

router.put('/:id', [
    // Middlewares
    validateJWT,
    check('name', 'Hospital name is necessary').not().isEmpty(),
    fieldValidator 
]
    , modifyHospital);

router.delete('/:id', [
    // Middlewares
    validateJWT
]
    , deleteHospital);

// Routes need
module.exports = router;