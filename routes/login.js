const passport = require("passport");
const express = require("express");
const { authorize } = require("../utils/utils");

const router = express.Router();

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

module.exports = router;
