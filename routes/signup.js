const router = require('express').Router();
const passport = require('passport');

router.post(
  '/',
  passport.authenticate('signup', { session: false }),
  async (req, res) => {
    res.json({
      message: 'Signup successful',
      user: req.user,
    });
  },
);

module.exports = router;
