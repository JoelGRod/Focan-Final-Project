// Requires Model
const Doctor = require('../models/doctor');

const getDoctors = async (request, response) => {

    const doctors = await Doctor.find({}, 'name img user hospital')
        .populate('user', 'name img')
        .populate('hospital', 'name img');

    response.status(200).json({
        ok: true,
        doctors: doctors
    });

}

const getDoctorById = async (request, response) => {
    const doctorId = request.params.id;

    try {
        const doctor = await Doctor.findById(doctorId, 'name img user hospital')
            .populate('user', 'name img')
            .populate('hospital', 'name img');
    
        response.status(200).json({
            ok: true,
            doctor: doctor
        });
    } catch (error) {
        console.log(error);
        response.status(400).json({
            ok: false,
            msg: 'Error getting doctor by Id'
        });
    }
}

const createDoctor = async (request, response) => {

    try {
        const doctor = new Doctor({
            user: request.uid,
            ...request.body
        });
        const doctorDb = await doctor.save();

        response.status(200).json({
            ok: true,
            doctor: doctorDb
        });
    } catch (error) {
        response.status(500).json({
            ok: false,
            msg: 'Error creating Doctor'
        });
    }


}

const modifyDoctor = async (request, response) => {

    const uid = request.uid;
    const doctorId = request.params.id;

    try {
        const doctorDb = await Doctor.findById(doctorId);

        if (!doctorDb) {
            return response.status(400).json({
                ok: false,
                msg: 'Doctor not found'
            });
        };

        const doctorChange = {
            ...request.body,
            user: uid
        };

        const updatedDoctor = await Doctor.findByIdAndUpdate(doctorId, doctorChange, { new: true })
            .populate('user', 'name img')
            .populate('hospital', 'name img');

        response.status(200).json({
            ok: true,
            msg: 'Doctor updated',
            doctor: updatedDoctor
        });

    } catch (error) {
        response.status(500).json({
            ok: false,
            msg: 'Error updating doctor'
        });
    }
}

const deleteDoctor = async (request, response) => {

    const doctorId = request.params.id;

    try {
        
        const doctorDb = await Doctor.findById( doctorId );

        if( !doctorDb ) {
            return response.status(400).json({
                ok: false,
                msg: 'Doctor not found'
            });
        };

        const deletedDoctor = await Doctor.findByIdAndDelete( doctorId )
            .populate('user', 'name img')
            .populate('hospital', 'name img');

        response.status(200).json({
            ok: true,
            msg: 'Delete Doctor',
            doctor: deletedDoctor
        });

    } catch (error) {
        response.status(500).json({
            ok: false,
            msg: 'Error deleting doctor'
        });
    }

}

module.exports = {
    getDoctors,
    createDoctor,
    modifyDoctor,
    deleteDoctor,
    getDoctorById,
}