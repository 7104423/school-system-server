/*
 * For more info see: https://medium.com/@prashantramnyc/node-js-with-passport-authentication-simplified-76ca65ee91e5
 */

const checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect('/login');
};

const checkLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect('/dashboard');
  }
  return next();
};

const logOut = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.logOut();
  return res.redirect('/login');
};

module.exports = { checkAuthenticated, checkLoggedIn, logOut };
