import express from 'express';
import path from 'path';
import session from './session.js';
import passport from './passport.js';
import indexRouter from '../routes/index.js';

const app = express();

app.set('views', path.resolve(import.meta.dirname, '../views'));
app.set('view engine', 'ejs');

app.use(session());
app.use(passport.session());

app.use('/', indexRouter);

export default app;
