/*
    Search routes
    Route: /api/search
*/

// Requires Gral
const { Router } = require('express');
const { check } = require('express-validator');
// Requires Controller
const { 
    generalSearch,
    collectionSearch
} = require('../controllers/search');
// Requires custom middleware
const { fieldValidator } = require('../middlewares/fields-validator');
const { validateJWT } = require('../middlewares/validate-jwt');

// Routes need
const router = Router();

router.get('/:search', validateJWT ,generalSearch);

router.get('/collection/:collection/:search', validateJWT ,collectionSearch);

// Routes need
module.exports = router;