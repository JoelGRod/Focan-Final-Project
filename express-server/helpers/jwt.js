const jwt = require('jsonwebtoken');

const generateJWT = ( uid ) => {

    return new Promise( (resolve, reject) => {
        /* 
        * Put in payload the info that you need.
        */
        const payload = { 
            uid 
        };
    
        // Define payload, key (in .env), {options}
        jwt.sign( payload, process.env.JWT_KEY, {
            expiresIn: '12h'
        }, (error, token) => {
            if(error) {
                reject("Can't generate Json Web Token: " + error);
            } else {
                resolve(token);
            }
    
        });
    });
};

module.exports = {
    generateJWT
};