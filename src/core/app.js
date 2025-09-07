import express from 'express';
import path from 'path';
import session from './session.js';
import passport from './passport.js';
import addUserToLocals from '../middlewares/add-user-to-locals.js';
import indexRouter from '../routes/index.js';
import foldersRouter from '../routes/folders.js';

const app = express();

app.set('views', path.resolve(import.meta.dirname, '../views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(session());
app.use(passport.session());
app.use(addUserToLocals());

app.use('/', indexRouter);
app.use('/folders', foldersRouter);

export default app;
