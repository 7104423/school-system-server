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
            res.status(400);
            return res.json({ status: 400, message }).status(400);
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
   * @returns {Promise<void>}
   */
  async (req, res, next) => {
    passport.authenticate(
      "google",
      /**
       * @param {Error} err
       * @param {UserDAO | false} user
       */
      async (err, user) => {
        try {
          if (err || !user) {
            res.status(400);
            return res.json({ status: 400, message: "User does not exist" });
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
