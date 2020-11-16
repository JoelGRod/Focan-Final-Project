/*
    Upload routes
    Route: /api/uploads
*/

// Requires Gral
const { Router } = require('express');
const expressFileUpload = require('express-fileupload');
// Requires Controller
const { 
    imageUpload,
    getImages 
} = require('../controllers/uploads');
// Requires custom middleware
const { validateJWT } = require('../middlewares/validate-jwt');

// Routes need
const router = Router();

// File uploads middleware - Grant access to request.files.<name>
router.use(expressFileUpload());

// Routes
router.put('/:collection/:id', [
    // Middlewares
    validateJWT
]
    , imageUpload);

router.get('/:collection/:image', [
    // Middlewares
]
    , getImages);


// Routes need
module.exports = router;