const express = require('express');
const multer = require('multer');
const User = require('../../models/User');
const auth = require('../../middleware/auth');
const {
    sendWelcomeEmail,
    sendCancelationEmail
} = require('../../emails/account');
const router = new express.Router();
const crypto = require('crypto');
const path = require('path');

let avatarURL = '';

async function randomToken() {
    const buffer = await new Promise((resolve, reject) => {
        crypto.randomBytes(50, function(ex, buffer) {
            if (ex) {
                reject('error generating token');
            }
            resolve(buffer);
        });
    });
    const token = crypto
        .createHash('sha1')
        .update(buffer)
        .digest('hex');
    return token;
}

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, '../../public/profile-images'));
    },
    filename: async function(req, file, cb) {
        const fileName =
            (await randomToken()) +
            '-' +
            Date.now() +
            path.extname(file.originalname);

        avatarURL = process.env.BASE_URL + '/public/profile-images/' + fileName;
        cb(null, fileName);
    }
});

var upload = multer({ storage: storage });

afterUpload = async (req, res, next) => {
    const user = new User({
        personal: req.body.personal,
        contact: req.body.contact,
        extra: {
            card: req.body.extra.card
        }
    });
    if (req.file) {
        user.extra.avatar = avatarURL;
    }

    try {
        await user.save();
        sendWelcomeEmail(user.email, user.name);
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
    } catch (e) {
        res.status(400).send(e);
    }
};

afterUploadUpdate = async (req, res, next) => {
    if (req.file) {
        req.user.extra.avatar = avatarURL;
    }
};

// @route POST api/users
// @desc Register User
// @access Public
router.post('/', upload.single('avatar'), afterUpload, async (req, res) => {});

// @route POST api/users/login
// @desc Login an existing user
// @access Public
router.post('/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(
            req.body.email,
            req.body.password
        );
        const token = await user.generateAuthToken();
        res.send({ user, token });
    } catch (e) {
        res.status(400).send();
    }
});

// @route POST api/users/logout
// @desc Logout authenticated user
// @access Private
router.post('/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => {
            return token.token !== req.token;
        });
        await req.user.save();

        res.send();
    } catch (e) {
        res.status(500).send();
    }
});

// @route POST api/users/logoutAll
// @desc Logout authenticated user from all devices
// @access Private
router.post('/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send();
    } catch (e) {
        res.status(500).send();
    }
});

// @route GET api/users/me
// @desc Current user details
// @access Private
router.get('/me', auth, async (req, res) => {
    res.send(req.user);
});

// @route PATCH api/users/me
// @desc Update current user details
// @access Private
router.patch(
    '/me',
    auth,
    upload.single('avatar'),
    afterUpload,
    async (req, res) => {
        const updates = Object.keys(req.body);
        const allowedUpdates = [
            'personal.name',
            'personal.email',
            'contact.address.field1',
            'contact.address.field2',
            'contact.address.pincode',
            'contact.address.city',
            'contact.address.state',
            'contact.address.country',
            'contact.phone',
            'extra.card.number',
            'extra.card.expiry',
            'extra.card.name'
        ];
        const isValidOperation = updates.every(update =>
            allowedUpdates.includes(update)
        );

        if (!isValidOperation) {
            return res.status(400).send({ error: 'Invalid updates!' });
        }

        try {
            updates.forEach(update => (req.user[update] = req.body[update]));
            await req.user.save();
            res.send(req.user);
        } catch (e) {
            res.status(400).send(e);
        }
    }
);

// @route DELETE api/users/me
// @desc Delete current user
// @access Private
router.delete('/me', auth, async (req, res) => {
    try {
        await req.user.remove();
        sendCancelationEmail(req.user.email, req.user.name);
        res.send(req.user);
    } catch (e) {
        res.status(500).send();
    }
});

// @route DELETE api/users/me/avatar
// @desc Delete avatar of current user
// @access Private
// router.delete('/me/avatar', auth, async (req, res) => {
//     req.user.avatar = undefined;
//     await req.user.save();
//     res.send();
// });

module.exports = router;
