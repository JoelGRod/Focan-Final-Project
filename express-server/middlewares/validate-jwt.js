const jwt = require('jsonwebtoken');
// Model
const User = require('../models/user');

const validateJWT = (request, response, next) => {

    // Read token
    const token = request.header('x-token');
    
    if(!token) {
        return response.status(400).json({
            ok: false,
            msg: "No Json Web Token added"
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.JWT_KEY);
        request.uid = uid;
        next();
    } catch (error) {
        response.status(400).json({
            ok: false,
            msg: "Invalid token"
        });
    }
};

const validateAdminRole = async (request, response, next) => {
    
    const uid = request.uid;

    try {
        const userDb = await User.findById(uid);

        if(!userDb) {
            return response.status(404).json({
                ok: false,
                msg: 'User not found'
            });
        }

        if(userDb.role !== 'ADMIN_ROLE') {
            return response.status(403).json({
                ok: false,
                msg: "User is not Admin"
            });
        }

        next();
        
    } catch (error) {
        console.log(error);
        response.status(500).json({
            ok: false,
            msg: "Error validating User Role"
        });
    }
}

const validateAdminRoleOrSameUser = async (request, response, next) => {
    
    const uid = request.uid;
    const id = request.params.id;

    try {
        const userDb = await User.findById(uid);

        if(!userDb) {
            return response.status(404).json({
                ok: false,
                msg: 'User not found'
            });
        }

        if(userDb.role === 'ADMIN_ROLE' || uid === id) {
            next();
        } else {
            return response.status(403).json({
                ok: false,
                msg: "User is not Admin"
            });
        }

        
    } catch (error) {
        console.log(error);
        response.status(500).json({
            ok: false,
            msg: "Error validating User Role"
        });
    }
}

module.exports = {
    validateJWT,
    validateAdminRole,
    validateAdminRoleOrSameUser
}