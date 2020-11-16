const User = require('../models/user');
const Doctor = require('../models/doctor');
const Hospital = require('../models/hospital');

const generalSearch = async (request, response) => {

    const search = request.params.search;
    const regex = new RegExp( search, 'i' );

    // inefficient
    // const users = await user.find({ name: regex });
    // const doctors = await doctor.find({ name: regex });
    // const hospitals = await hospital.find({ name: regex });

    // efficient
    const [ users, doctors, hospitals ] = await Promise.all([
        User.find({ name: regex }),
        Doctor.find({ name: regex }).populate('user', 'name img').populate('hospital', 'name img'),
        Hospital.find({ name: regex }).populate('user', 'name img')
    ]);

    response.status(200).json({
        ok: true,
        users: users,
        doctors: doctors,
        hospitals: hospitals
    });
}

const collectionSearch = async (request, response) => {

    const { search, collection } = request.params;
    const regex = new RegExp( search, 'i' );

    let data = [];

    switch (collection) {
        case 'user':
            data = await User.find({ name: regex });
            break;
        case 'doctor':
            data = await Doctor.find({ name: regex }).populate('user', 'name img').populate('hospital', 'name img');
            break;
        case 'hospital':
            data = await Hospital.find({ name: regex }).populate('user', 'name img');
            break;
        default:
            return response.status(400).json({
                ok: false,
                msg: 'Allowed collections: user - doctor - hospital'
            });
    }

    response.status(200).json({
        ok: true,
        collection: collection,
        data: data
    });
}


module.exports = {
    generalSearch,
    collectionSearch
}