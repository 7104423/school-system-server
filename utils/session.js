/*
 * For more info see: bit.ly/3INUAm8
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
