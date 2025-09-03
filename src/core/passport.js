import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';
import db from './db.js';

passport.use(
  new LocalStrategy({ usernameField: 'name' }, async (name, pass, done) => {
    try {
      const user = await db.user.findUnique({ where: { name } });
      if (!user) return done(null, false);
      const match = await bcrypt.compare(pass, user.password);
      if (!match) return done(null, false);
      done(null, user);
    } catch (err) {
      done(err);
    }
  }),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.user.findUnique({ where: { id } });
    done(null, user);
  } catch (err) {
    done(err);
  }
});

export default passport;
