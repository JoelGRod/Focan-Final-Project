const {Schema, model} = require('mongoose');

const DoctorSchema = Schema ({
    name: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    // Foreign key
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    hospital: {
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        required: true
    }
}, { collections: 'Doctors' } ); // Define schema name literally in db

// Rename _id to uid and hide fields
DoctorSchema.method('toJSON', function() {
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
});

// Module export
module.exports = model('Doctor', DoctorSchema);