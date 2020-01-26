const express = require('express');
const users = require('./api/users');
const menuItemsList = require('./api/menuItemsList');
const routing = express.Router();

// Define Routes
routing.get('/', (req, res) => res.send('API Running'));
routing.use('/api/users', users);
routing.use('/api/menu-items-list', menuItemsList);

module.exports = routing;
