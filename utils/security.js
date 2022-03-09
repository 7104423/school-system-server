import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import passport from "passport";
import UserModel from "../model/user.model";

/**
 * @param {Array.<'STUDENT' | 'TEACHER' | 'ADMIN'>} groups
 * @returns {(req, res, next) => Promise}
 */
export const availableFor = (groups = []) => {
  return async (req, res, next) => {
    // eslint-disable-next-line no-underscore-dangle
    const userID = mongoose.Types.ObjectId(req?.user?._id);
    const user = await UserModel.aggregate([
      {
        $match: { _id: userID },
      },
      {
        $match: { groups: { $elemMatch: { name: { $in: groups } } } },
      },
    ]);
    if (!user) {
      return res.json({ status: "failed" });
    }
    return next();
  };
};

/**
 * @param {{_id: string, email: string}} user
 * @returns {(req, res, next) => Promise}
 */
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

export const authenticate = () => {
  return passport.authenticate("jwt", { session: false });
};

export const signup = () => {
  return passport.authenticate("signup", { session: false });
};

export const login = () => {
  return passport.authenticate("login", { session: false });
};
