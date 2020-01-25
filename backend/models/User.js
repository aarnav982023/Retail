const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    personal: {
        username: {
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
        }
    },
    contact: {
        address: {
            field1: {
                type: String,
                required: true
            },
            field2: {
                type: String
            },
            pincode: {
                type: String,
                required: true
            },
            city: {
                type: String,
                required: true
            },
            state: {
                type: String,
                required: true
            },
            country: {
                type: String,
                required: true
            }
        },
        phone: {
            type: String,
            required: true,
            unique: true
        }
    },
    extra: {
        avatar: {
            type: String
        },
        card: {
            number: {
                type: String,
                required: true
            },
            expiry: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            }
        }
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model('user', UserSchema);
