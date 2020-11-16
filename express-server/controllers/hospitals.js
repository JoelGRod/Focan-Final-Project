// Requires Model
const Hospital = require('../models/hospital');

const getHospitals = async ( request, response ) => {

    const hospitals = await Hospital.find({}, 'name img user')
        .populate('user', 'name img');

    response.status(200).json({
        ok: true,
        hospitals: hospitals
    });
    
}

const createHospital = async ( request, response ) => {
  
    try {
        const hospital = new Hospital({
            user: request.uid,
            ...request.body});
        const hospitalDb = await hospital.save();
        
        response.status(200).json({
            ok: true,
            hospital: hospitalDb
        });
    } catch (error) {
        response.status(500).json({
            ok: false,
            msg: 'Error creating hospital'
        });
    }

}

const modifyHospital = async ( request, response ) => {

    const hospitalId = request.params.id;
    const uid = request.uid;

    try {
        const hospitalDb = await Hospital.findById(hospitalId);
    
        if( !hospitalDb ) {
            return response.status(400).json({
                ok: false,
                msg: 'Hospital not found'
            });
        }

        const hospitalChange = {
            ...request.body,
            user: uid
        };

        const updatedHospital = await Hospital.findByIdAndUpdate( hospitalId, hospitalChange, {new: true})
            .populate('user', 'name img');

        response.status(200).json({
            ok: true,
            hospital: updatedHospital
        });
    } catch (error) {
        response.status(500).json({
            ok: false,
            msg: 'Error at modify hospital'
        });
    }


}

const deleteHospital = async ( request, response ) => {

    const hospitalId = request.params.id;

    try {
        const hospitalDb = await Hospital.findById(hospitalId);

        if( !hospitalDb ) {
            return response.status(400).json({
                ok: false,
                msg: 'Hospital not found'
            })
        }

        const deletedHospital = await Hospital.findByIdAndDelete( hospitalId );
        
        response.status(200).json({
            ok: true,
            msg: 'Hospital deleted',
            hospital: deletedHospital
        });

    } catch (error) {
        response.status(500).json({
            ok: false,
            msg: 'Error deleting hospital'
        })
    }


}

module.exports = {
    getHospitals,
    createHospital,
    modifyHospital,
    deleteHospital
}