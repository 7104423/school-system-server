const express = require("express");
const passport = require("passport");
const { availableFor } = require("../utils/middlewares");

const router = express.Router();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  availableFor(["STUDENT"]),
  (req, res) => {
    res.json({ message: "This section is available only for students" });
  },
);

module.exports = router;
