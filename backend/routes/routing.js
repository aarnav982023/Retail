const express = require('express');
const users = require('./api/users');
const routing = express.Router();

// Define Routes
routing.get('/', (req, res) => res.send('API Running'));
routing.use('/api/users', users);

module.exports = routing;
