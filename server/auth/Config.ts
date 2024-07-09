import passport from 'passport';
import User from '../models/User';
import bcrypt from 'bcrypt';
const localStrategy = require('passport-local').Strategy;

module.exports = function (passport: any) {
  passport.use(
    new localStrategy(async (username: string, password: string, done: any) => {
      try {
        const user = await User.findOne({username: username});
        if (!user || !user.password) {
          return done(null, false);
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return done(null, false);
        } else {
          return done(null, user);
        }
      } catch (err) {
        return done(err);
      }
    }),
  );
};

passport.serializeUser((user, cb) => {
  cb(null, (user as any).id);
});

passport.deserializeUser((id, cb) => {
  User.findById(id)
    .then(user => {
      cb(null, user);
    })
    .catch(err => {
      cb(err, null);
    });
});
