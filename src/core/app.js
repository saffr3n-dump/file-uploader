import express from 'express';
import session from './session.js';
import indexRouter from '../routes.js';

const app = express();

app.use(session());

app.use('/', indexRouter);

export default app;
