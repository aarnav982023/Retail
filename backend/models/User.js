const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    personal: {
        username: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error('Email is invalid');
                }
            }
        },
        password: {
            type: String,
            required: true,
            trim: true,
            validate(value) {
                if (value.toLowerCase().includes('password')) {
                    throw new Error('Password cannot contain "password"');
                }
                if (!/^(?=.*[a-z])/.test(value)) {
                    throw new Error(
                        'The password must contain at least 1 lowercase alphabetical character'
                    );
                }
                if (!/^(?=.*[A-Z])/.test(value)) {
                    throw new Error(
                        'The password must contain at least 1 uppercase alphabetical character'
                    );
                }
                if (!/^(?=.*[0-9])/.test(value)) {
                    throw new Error(
                        'The password must contain at least 1 numeric character'
                    );
                }
                if (!/^(?=.*[!@#$%^&])/.test(value)) {
                    throw new Error(
                        'The password must contain at least one special character'
                    );
                }
                if (!/^(?=.{8,})/.test(value))
                    throw new Error(
                        'The password must be eight characters or longer'
                    );
            }
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
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});

UserSchema.methods.toJSON = function() {
    const user = this;
    const userObject = user.toObject();

    delete userObject.personal.password;
    delete userObject.tokens;
    delete userObject.extra;

    return userObject;
};

UserSchema.methods.generateAuthToken = async function() {
    const user = this;
    const token = jwt.sign(
        { _id: user._id.toString() },
        process.env.JWT_SECRET
    );

    user.tokens = user.tokens.concat({ token });
    await user.save();

    return token;
};

UserSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ 'personal.email': email });

    if (!user) {
        throw new Error('Username or password invalid');
    }

    const isMatch = await bcrypt.compare(password, user.personal.password);

    if (!isMatch) {
        throw new Error('Username or password invalid');
    }

    return user;
};

// Hash the plain text password before saving
UserSchema.pre('save', async function(next) {
    const user = this;

    if (user.isModified('personal.password')) {
        user.personal.password = await bcrypt.hash(user.personal.password, 8);
    }

    next();
});

// @Todo:- Delete user's profile image when user is removed
UserSchema.pre('remove', async function(next) {
    //const user = this
    next();
});

module.exports = User = mongoose.model('user', UserSchema);
