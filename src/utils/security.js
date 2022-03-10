import jwt from "jsonwebtoken";
import passport from "passport";
import { UserDAO } from "../dao/user.dao";
import { AuthorizeProps, GroupTypes } from "../types";

/**
 * @param {GroupTypes} groups
 * @returns {(req, res, next) => Promise}
 */
export const availableFor = (groups = []) => {
  return async (req, res, next) => {
    const user = await UserDAO.findByID(req?.user?.id);
    if (!user && !(await user.hasGroup(groups))) {
      return res.json({ status: "failed" });
    }
    return next();
  };
};

/**
 * @param {AuthorizeProps} user
 * @returns {(req, res, next) => Promise}
 */
export const authorize = user => {
  return (req, res, next) => {
    return req.login(user, { session: false }, async error => {
      if (error) {
        return next(error);
      }

      // eslint-disable-next-line no-underscore-dangle
      const body = { id: user.id, email: user.email };
      const token = jwt.sign({ user: body }, process.env.JWT_SECRET);
      return res.json({ token });
    });
  };
};

/**
 * @returns {(req, res, next) => Promise}
 */
export const authenticate = () => {
  return passport.authenticate("jwt", { session: false });
};

/**
 * @returns {(req, res, next) => Promise}
 */
export const signup = () => {
  return passport.authenticate("signup", { session: false });
};

/**
 * @returns {(req, res, next) => Promise}
 */
export const login = () => {
  return passport.authenticate("login", { session: false });
};