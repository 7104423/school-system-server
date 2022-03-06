import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JWTstrategy, ExtractJwt } from 'passport-jwt';
import { OAuth2Client } from 'google-auth-library';
import UserModel from '../model/user.model';

export default () => {
  passport.use(
    'signup',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      async (email, password, done) => {
        try {
          const user = await UserModel.create({ email, password });
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      },
    ),
  );

  passport.use(
    'login',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      async (email, password, done) => {
        console.log('accessToken');
        try {
          const user = await UserModel.findOne({ email });

          if (!user) {
            return done(null, false, { message: 'User not found' });
          }

          const validate = await user.isValidPassword(password);

          if (!validate) {
            return done(null, false, { message: 'Wrong Password' });
          }

          return done(null, user, { message: 'Logged in Successfully' });
        } catch (error) {
          return done(error);
        }
      },
    ),
  );

  passport.use(
    'google',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      async (email, password, done) => {
        try {
          const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
          await googleClient.verifyIdToken({
            idToken: password,
            audience: process.env.GOOGLE_CLIENT_ID,
          })
          const user = await UserModel.findOne({ email });
          return done(null, user);
        } catch (error) {
          return done(error, false, { message: 'Incorrect Google token' });
        }
      },
    ),
  );

  passport.use(
    new JWTstrategy(
      {
        secretOrKey: process.env.JWT_SECRET,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      },
      async (token, done) => {
        try {
          return done(null, token.user);
        } catch (error) {
          return done(error);
        }
      },
    ),
  );
}
