import fs from "fs";
import jwt from "jsonwebtoken";

export const checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect("/login");
};

export const checkLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect("/dashboard");
  }
  return next();
};

export const logOut = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next();
  }
  req.logOut();
  return res.redirect("/login");
};

export const getRoutes = directoryPath =>
  new Promise((resolve, reject) => {
    fs.readdir(directoryPath, (error, files) => {
      if (error) {
        reject(error);
      } else {
        resolve(
          files
            .filter(file => !file.startsWith("_") && file.endsWith(".js"))
            .map(file => [
              file.replace(".js", ""),
              // eslint-disable-next-line global-require,import/no-dynamic-require
              require(`${directoryPath}/${file}`),
            ]),
        );
      }
    });
  });

export const authorize = user => {
  return (req, res, next) => {
    return req.login(user, { session: false }, async error => {
      if (error) {
        return next(error);
      }

      // eslint-disable-next-line no-underscore-dangle
      const body = { _id: user._id, email: user.email };
      const token = jwt.sign({ user: body }, process.env.JWT_SECRET);
      return res.json({ token });
    });
  };
};
