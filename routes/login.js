const router = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

/* GET home page. */
router.post('/', async (req, res, next) => {
  passport.authenticate(
    'login',
    async (err, user) => {
      try {
        if (err || !user) {
          const error = new Error('An error occurred during login.');
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
            return res.json({ token });
          },
        );
      } catch (error) {
        return next(error);
      }
    },
  )(req, res, next);
});

module.exports = router;
