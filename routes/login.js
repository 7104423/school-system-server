import passport from "passport";
import { Router } from "express";
import { authorize } from "../utils";

const router = Router();

router.post("/", async (req, res, next) => {
  passport.authenticate("login", async (err, user) => {
    try {
      if (err || !user) {
        const error = new Error("An error occurred during login.");
        return next(error);
      }
      return authorize(user)(req, res, next);
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

router.post("/google", async (req, res, next) => {
  passport.authenticate("google", async (err, user) => {
    try {
      if (err || !user) {
        const error = new Error("An error occurred during login.");
        return next(error);
      }
      return authorize(user)(req, res, next);
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

export default router;
