// Imports
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

// App config
const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

// Auth
const authUser = (user, password, done) => {
  const authenticatedUser = { id: 123, name: 'Kyle' };
  return done(null, authenticatedUser);
};
passport.use(new LocalStrategy(authUser));
passport.serializeUser((userObj, done) => {
  done(null, userObj);
});
passport.deserializeUser((userObj, done) => {
  done(null, userObj);
});

// Router
app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
