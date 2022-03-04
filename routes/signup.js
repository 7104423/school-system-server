import router from '../utils/router';
import passport from 'passport';

export default router.post(
  '/',
  passport.authenticate('signup', { session: false }),
  async (req, res) => {
    res.json({
      message: 'Signup successful',
      user: req.user,
    });
  },
);
