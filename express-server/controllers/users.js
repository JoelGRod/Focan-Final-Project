// Requires Model
const User = require('../models/user');
// Requires Gral
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');

// User routes controllers

const getUsers = async (request, response) => {

    // Pagination
    const from = Number(request.query.from) || 0;

    /* Problems with solution below is we need to wait for two responses
    *  We need to execute this querys at the same time.
    */
    // const users = await User.find({}, 'name email role google')
    //     .skip(from)
    //     .limit( 5 );

    // // Registers in Db
    // const totalRegs = await User.count();

    // Solution to the above problem. execute all this promises (in array) at the same time
    const [ users, totalRegs ] = await Promise.all([
        User.find({}, 'name email role google img')
        .skip(from)
        .limit( 5 ),

        User.countDocuments()
    ]);

    response.status(200).json({
        ok: true,
        users: users,
        total_regs: totalRegs,
        uid: request.uid
    });
}

const createUser = async (request, response) => {
    const { email, password } = request.body;

    try {
        const emailExists = await User.findOne({ email });

        if (emailExists) {
            return response.status(400).json({
                ok: false,
                msg: "Email already exists"
            });
        }

        const user = new User(request.body);

        // Password encryption
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        // Generate token
        const token = await generateJWT( user._id );

        // Save user
        await user.save();
        
        response.status(200).json({
            ok: true,
            user: user,
            token: token
        });
    } catch (error) {
        console.log(error);
        response.status(500).json({
            ok: false,
            msj: "Error creating user in db - ¿some required field is missing?"
        })
    }
}

const modifyUser = async (request, response) => {
    // TODO: Validar token y comprobar si es el usuario correcto

    const uid = request.params.id;

    try {
        /* Code repeated */
        const userDb = await User.findById(uid);

        if (!userDb) {
            return response.status(400).json({
                ok: false,
                msg: "User doesn't exists"
            });
        }
        /* Code repeated */

        // Prepare Updates
        const { password, google, email, ...fields } = request.body;

        // Check that email doesn't exists in db
        if (userDb.email !== email) {
            const emailExists = await User.findOne({ email: email });
            if (emailExists) {
                return response.status(400).json({
                    ok: false,
                    msg: "Email already exists"
                });
            }
        }

        // Google user can't change email
        if(!userDb.google) {
            fields.email = email;
        } else if( userDb.email !== email ) {
            return response.status(400).json({
                ok: false,
                msg: "Google user can't change email"
            });
        };

        // Update user in db
        const updatedUser = await User.findByIdAndUpdate(uid, fields, { new: true });

        response.status(200).json({
            ok: true,
            user: updatedUser,
        });

    } catch (error) {
        console.log(error);
        response.status(500).json({
            ok: false,
            msg: "Error updating user"
        });
    }
}

const deleteUser = async (request, response) => {

    const uid = request.params.id;

    try {
        /* Code repeated */
        const userDb = await User.findById(uid);

        if (!userDb) {
            return response.status(400).json({
                ok: false,
                msg: "User doesn't exists"
            });
        }
        /* Code repeated */

        await User.findByIdAndDelete(uid);

        response.status(200).json({
            ok: true,
            msg: "User deleted: " + uid
        });
        
    } catch (error) {
        console.log(error);
        response.status(500).json({
            ok: false,
            msg: "Error deleting user"
        });
    }

}

module.exports = {
    getUsers,
    createUser,
    modifyUser,
    deleteUser
};