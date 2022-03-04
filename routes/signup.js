import passport from 'passport';
import express from 'express';
const router = express.Router();

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
