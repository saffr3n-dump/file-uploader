import session from 'express-session';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import db from './db.js';

const secret = process.env.SESSION_SECRET;
if (!secret) {
  throw new Error('SESSION_SECRET must be specified');
}

const store = new PrismaSessionStore(db, {
  checkPeriod: 5 * 60 * 1000,
  dbRecordIdIsSessionId: true,
});

export default () =>
  session({
    cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 },
    saveUninitialized: false,
    resave: false,
    secret,
    store,
  });
