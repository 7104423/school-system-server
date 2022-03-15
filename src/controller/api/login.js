import passport from "passport";
import { Router } from "express";
import { authorize } from "../../utils";
import { UserDAO } from "../../dao/user.dao";
import { Request, Response, NextFunction } from "express";

const router = Router();

router.post(
  "/",
  /**
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {Promise<void>}
   */
  async (req, res, next) => {
    passport.authenticate(
      "login",
      /**
       * @param {Error} err
       * @param {UserDAO | false} user
       */
      async (err, user, { message }) => {
        try {
          if (err || !user) {
            const error = new Error("An error occurred during login.");
            return res.json({ status: 500, message });
          }
          return authorize(user)(req, res, next);
        } catch (error) {
          return next(error);
        }
      }
    )(req, res, next);
  }
);

router.post(
  "/google",
  /**
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  async (req, res, next) => {
    passport.authenticate(
      "google",
      /**
       * @param {Error} err
       * @param {UserDAO | false} user
       * @returns {Promise<void>}
       */
      async (err, user) => {
        try {
          if (err || !user) {
            const error = new Error("An error occurred during login.");
            return next(error);
          }
          return authorize(user)(req, res, next);
        } catch (error) {
          return next(error);
        }
      }
    )(req, res, next);
  }
);

export default router;
