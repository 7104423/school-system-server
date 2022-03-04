// Imports
require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = require('./routes/_router');
const secureRoute = require('./routes/secureRoute/_router');

// App config
const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Body parser
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());

// DB connect
// eslint-disable-next-line max-len
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true });
const db = mongoose.connection;
if (!db) {
  // eslint-disable-next-line no-console
  console.error('Error connecting db');
} else {
  // eslint-disable-next-line no-console
  console.log('Db connected successfully');
}

// Router
router(app);

// Auth
require('./utils/auth');

app.use('/user', passport.authenticate('jwt', { session: false }), secureRoute);

// eslint-disable-next-line no-console
console.log('Application runs on: http://localhost:3000/');

module.exports = app;
