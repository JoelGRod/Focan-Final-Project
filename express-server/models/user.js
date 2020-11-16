const {Schema, model} = require('mongoose');

const UserSchema = Schema ({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    role: {
        type: String,
        required: true,
        default: 'USER_ROLE'
    },
    google: {
        type: Boolean,
        default: false
    }
});

// Rename _id to uid and hide fields
UserSchema.method('toJSON', function() {
    const {__v, _id, password, ...object} = this.toObject();
    object.uid = _id;
    return object;
});

// Module export
module.exports = model('User', UserSchema);