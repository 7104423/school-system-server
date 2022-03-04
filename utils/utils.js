/*
* For more info see: https://bit.ly/3INUAm8
*/
const fs = require('fs');

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

const getRoutes = (directoryPath) => {
  fs.readdir(directoryPath, (error, files) => {
    if (error) {
      // eslint-disable-next-line no-console
      console.error(`Unable to scan directory: ${error}`);
      return [];
    }
    return files
      .filter((file) => !file.startsWith('_'))
      .map((file) => file.replace('.js', ''));
  });
};

module.exports = {
  checkAuthenticated, checkLoggedIn, logOut, getRoutes,
};
