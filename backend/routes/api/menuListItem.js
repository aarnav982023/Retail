const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const config = require('config');
const uri = config.get('mongoURI');

// @route GET api/menuListItem
// @desc Menu List Items
// @access Public
router.get('/', async (req, res) => {
    try {
        MongoClient.connect(uri, { useUnifiedTopology: true }, function(
            err,
            db
        ) {
            if (err) {
                return console.dir(err);
            }
            let dbo = db.db('test');
            var collection = dbo
                .collection('menuItemList')
                .findOne({}, (err, result) => {
                    if (err) throw err;
                    res.json(result);
                    db.close();
                });
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
