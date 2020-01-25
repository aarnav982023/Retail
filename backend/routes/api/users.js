// Handles registering users api
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');

// @route POST api/users
// @desc Register User
// @access Public
router.post(
    '/',
    [
        check('name', 'Name is required')
            .not()
            .isEmpty(),
        check('email', 'Please enter a valid email address.')
            .not()
            .isEmpty()
            .isEmail()
            .normalizeEmail(),
        check(
            'password',
            'Password must be at least 8 characters long.'
        ).isLength({ min: 8 }),
        check('field1', 'Address Field 1 is required')
            .not()
            .isEmpty(),
        check('pincode')
            .not()
            .isEmpty()
            .withMessage('Pincode is required')
            .isPostalCode()
            .withMessage('Enter a valid Postal Code'),
        check('city', 'City is required')
            .not()
            .isEmpty(),
        check('state', 'State is required')
            .not()
            .isEmpty(),
        check('country', 'Country is required')
            .not()
            .isEmpty(),
        check('phone')
            .not()
            .isEmpty()
            .withMessage('Phone number is compulsory')
            .isMobilePhone()
            .withMessage('Enter a valid Phone number')
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        const { name, email, password1, password2 } = req.body;

        try {
            // Check if user already exists
            let user = await User.findOne({ email });

            if (user) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: 'User already exists' }] });
            }

            // Creating the user using model
            user = new User({
                name,
                email,
                password: password1
            });

            // Encrypt password
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password1, salt);

            // Save the user to database
            await user.save();
            res.json({ msg: 'User Registered' });
        } catch (ex) {
            console.log(ex.message);
            res.status(500).send('Server Error');
        }
    }
);

module.exports = router;
