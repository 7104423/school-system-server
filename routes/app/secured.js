const express = require("express");

const router = express.Router();

/* GET home page. */
router.get("/", (req, res) => {
  res.json({
    message: "Signup successful",
    user: req.user,
  });
});

module.exports = router;
