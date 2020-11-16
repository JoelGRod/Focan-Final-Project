const fs = require('fs');

const User = require('../models/user');
const Doctor = require('../models/doctor');
const Hospital = require('../models/hospital');

const deleteImage = ( path ) => {
    if( fs.existsSync( path )) {
        // Delete old image
        fs.unlinkSync( path );
    }
}

const updateImage = async ( collection, id, fileName ) => {
    let oldPath = '';

    switch (collection) {
        case 'users':
            const userDb = await User.findById(id);
            if(!userDb) {
                console.log("User not found");
                return false;
            }

            oldPath = `./uploads/users/${userDb.img}`;
            deleteImage(oldPath);

            userDb.img = fileName;
            await userDb.save();
            return true;
            break;

        case 'hospitals':
            const hospitalDb = await Hospital.findById(id);
            if(!hospitalDb) {
                console.log("Hospital not found");
                return false;
            }

            oldPath = `./uploads/hospitals/${hospitalDb.img}`;
            deleteImage(oldPath);

            hospitalDb.img = fileName;
            await hospitalDb.save();
            return true;
            break;

        case 'doctors':
            const doctorDb = await Doctor.findById(id);
            if(!doctorDb) {
                console.log("Doctor not found");
                return false;
            }

            oldPath = `./uploads/doctors/${doctorDb.img}`;
            deleteImage(oldPath);

            doctorDb.img = fileName;
            await doctorDb.save();
            return true;
            break;

        default:
            console.log('Wrong collection in file upload - updateImg.js - WTF');
            return false;
            break;
    }
}

module.exports = {
    updateImage
}