const express = require('express');
const multer = require('multer');
//const sharp = require('sharp')
const User = require('../../models/User');
const auth = require('../../middleware/auth');
const {
    sendWelcomeEmail,
    sendCancelationEmail
} = require('../../emails/account');
const router = new express.Router();

// @route POST api/users
// @desc Register User
// @access Public
router.post('/', async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        sendWelcomeEmail(user.email, user.name);
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
    } catch (e) {
        res.status(400).send(e);
    }
});

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
router.patch('/me', auth, async (req, res) => {
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
});

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

// const upload = multer({
//     limits: {
//         fileSize: 1000000
//     },
//     fileFilter(req, file, cb) {
//         if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
//             return cb(new Error('Please upload an image'));
//         }

//         cb(undefined, true);
//     }
// });

// @route POST api/users/me/avatar
// @desc Add avatar for current user
// @access Private
// router.post('/me/avatar', auth, upload.single('avatar'), async (req, res) => {
//     const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
//     req.user.avatar = buffer
//     await req.user.save()
//     res.send()
// }, (error, req, res, next) => {
//     res.status(400).send({ error: error.message })
// })

// @route DELETE api/users/me/avatar
// @desc Delete avatar of current user
// @access Private
// router.delete('/me/avatar', auth, async (req, res) => {
//     req.user.avatar = undefined;
//     await req.user.save();
//     res.send();
// });

// @route GET api/users/:id/avatar
// @desc Register User
// @access Public
// router.get('/:id/avatar', async (req, res) => {
//     try {
//         const user = await User.findById(req.params.id);

//         if (!user || !user.avatar) {
//             throw new Error();
//         }

//         res.set('Content-Type', 'image/png');
//         res.send(user.avatar);
//     } catch (e) {
//         res.status(404).send();
//     }
// });

module.exports = router;
