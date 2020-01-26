const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes/routing');
const connectDB = require('./config/db');

app = express();

//Connecting to the database
connectDB();

app.use(bodyParser.json());
app.use('/', router);

//process.env.PORT will pickup the port from environment variable when deployed on Server
const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
