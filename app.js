// Imports
require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const router = require('./routes/_router');

// App config
const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Router
router(app);

// Auth
require('./utils/auth');
app.use('/user', passport.authenticate('jwt', { session: false }), secureRoute);

module.exports = app;
