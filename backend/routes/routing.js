const express = require('express');
const users = require('./api/users');
const menuListItem = require('./api/menuListItem');
const routing = express.Router();

// Define Routes
routing.get('/', (req, res) => res.send('API Running'));
routing.use('/api/users', users);
routing.use('/api/menuListItem', menuListItem);

module.exports = routing;
