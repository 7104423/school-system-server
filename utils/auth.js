const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

module.exports = () => {
  // Find user in a database
  const authUser = (user, password, done) => {
    const authenticatedUser = { id: 123, name: 'Kyle' };
    return done(null, authenticatedUser);
  };
  passport.use(new LocalStrategy(authUser));

  // Serialize user
  passport.serializeUser((userObj, done) => {
    done(null, userObj);
  });

  // Deserialize - remove password
  passport.deserializeUser((userObj, done) => {
    done(null, userObj);
  });
};
