// Requires Model
const User = require('../models/user');
// Requires Gral
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/googleVerify');
// Menu
const { getMenuFrontend } = require('../helpers/menu-frontend');

const login = async (request, response) => {
    const { email, password } = request.body;

    try {

        const userDb = await User.findOne({ email });

        if( !userDb ) {
            return response.status(400).json({
                ok: false,
                msg: "User or password doesn't match"
            });
        }

        // Verify password
        const validPassword = bcrypt.compareSync(password, userDb.password);

        if(!validPassword) {
            return response.status(400).json({
                ok: false,
                msg: "User or password doesn't match"
            });
        }

        // Generate Token - JWT
        const token = await generateJWT( userDb._id );
        
        response.status(200).json({
            ok: true,
            token: token,
            menu: getMenuFrontend(userDb.role)
        });

    } catch (error) {
        console.log(error);
        response.status(500).json({
            ok: false,
            msg: "Error in login"
        });
    }
};

const loginGoogle = async (request, response) => {

    const google_token = request.body.google_token;

    try {
        // Verify google token and get user info
        const { name, email, picture } = await googleVerify(google_token);
        
        // Verify if user exists
        const userDb = await User.findOne( { email } );
        let user;

        if( !userDb ) {
            // If user don't exists
            user = new User({
                name: name,
                email: email,
                password: 'no password',
                img: picture,
                google: true
            });
        } else {
            // User exists
            user = userDb;
            user.google = true;
            user.password = 'no password'
        }

        // Save in db (if exists, modify the same user, doesnt create a new one)
        await user.save();

        // Generate token
        const token = await generateJWT( user._id );
        
        response.status(200).json({
            ok: true,
            token: token,
            menu: getMenuFrontend(user.role)
        });
    } catch (error) {
        response.status(401).json({
            ok: false,
            msg: 'Invalid Google Token'
        })
    }
};

const renewToken = async (request, response) => {

    const uid = request.uid;

    const [ userDb, token ] = await Promise.all([
        User.findById( uid ),
        // Generate Token - JWT
        generateJWT( uid ),
    ]);

    const { role } = userDb;

    response.status(200).json({
        ok: true,
        token: token,
        user: userDb,
        menu: getMenuFrontend(role)
    })
};

module.exports = {
    login,
    loginGoogle,
    renewToken
};