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
  if (!req.isAuthenticated()) {
    return next();
  }
  req.logOut();
  return res.redirect('/login');
};

const getRoutes = (directoryPath) => new Promise((resolve, reject) => {
  fs.readdir(directoryPath, (error, files) => {
    if (error) {
      reject(error);
    } else {
      resolve(
        files
          .filter((file) => !file.startsWith('_') && file.endsWith('.js'))
          .map((file) => [
            file.replace('.js', ''),
            // eslint-disable-next-line global-require,import/no-dynamic-require
            require(`${directoryPath}/${file}`),
          ]),
      );
    }
  });
});

module.exports = {
  checkAuthenticated, checkLoggedIn, logOut, getRoutes,
};
