import fs from 'fs';

export const checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect('/login');
};

export const checkLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect('/dashboard');
  }
  return next();
};

export const logOut = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next();
  }
  req.logOut();
  return res.redirect('/login');
};

export const getRoutes = (directoryPath) => new Promise((resolve, reject) => {
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
