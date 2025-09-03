import express from 'express';
import session from './session.js';
import passport from './passport.js';
import indexRouter from '../routes/index.js';

const app = express();

app.use(session());
app.use(passport.session());

app.use('/', indexRouter);

export default app;
