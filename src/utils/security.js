import jwt from "jsonwebtoken";
import passport from "passport";
import { UserDAO } from "../dao/user.dao";
import { AuthorizeProps, GroupTypes } from "../types";
import { Request, Response, NextFunction, Express } from "express";

/**
 * @param {GroupTypes[]} groups
 * @returns {(req: Request, res: Response, next: NextFunction) => Promise}
 */
export const availableFor = (groups = []) => {
  return async (req, res, next) => {
    const user = UserDAO.getSessionUser(req);
    if (!user || !(await user.hasGroup(groups))) {
      if (groups.includes("$_CURRENT_USER") && user.id === req.body.id) {
        next();
      }
      return res.json({ status: 400, message: "Access denied" }).status(400);
    }
    return next();
  };
};

/**
 * @param {AuthorizeProps} user
 * @returns {(req:Request, res: Response, next:NextFunction ) => void}
 */
export const authorize = ({ id, email, password, ...user }) => {
  return (req, res, next) => {
    return req.login(user, { session: false }, async (error) => {
      if (error) {
        return next(error);
      }

      const body = { id, email };
      const token = jwt.sign({ user: body }, process.env.JWT_SECRET);
      return res.json({ token, email, user });
    });
  };
};

/**
 * @returns {(req:Request, res: Response, next: NextFunction ) => Promise<any>}
 */
export const authenticate = () => {
  return passport.authenticate("jwt", { session: false });
};

/**
 * @returns {(req: Request, res: Response, next: NextFunction) => Promise}
 */
export const signup = () => {
  return passport.authenticate("signup", { session: false });
};

/**
 * @returns {(req: Request, res: Response, next: NextFunction) => Promise}
 */
export const login = () => {
  return passport.authenticate("login", { session: false });
};
