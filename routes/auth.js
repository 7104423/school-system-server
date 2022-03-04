import passport from 'passport';
import jwt from 'jsonwebtoken';
import express from 'express';
const router = express.Router();

router.get(
  '/google',
  ((req, res, next) => (
    passport.authenticate(
      'google',
      {
        scope: ['email', 'profile'],
      },
    )(req, res, next)
  )),
);

router.get(
  '/google/callback',
  (req, res, next) => {
    passport.authenticate('google', async (err, user, { message }) => {
      try {
        if (err || !user) {
          const error = new Error(`An error occurred during login. ${message}`);
          return next(error);
        }

        return req.login(
          user,
          { session: false },
          async (error) => {
            if (error) {
              return next(error);
            }

            // eslint-disable-next-line no-underscore-dangle
            const body = { _id: user._id, email: user.email };
            const token = jwt.sign({ user: body }, process.env.JWT_SECRET);
            res.cookie('jwt', token);
            return res.redirect(process.env.CLIENT_URL);
          },
        );
      } catch (error) {
        return next(error);
      }
    })(req, res, next);
  },
);

module.exports = router;
