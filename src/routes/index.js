import { Router } from 'express';
import {
  home,
  loginGet,
  registerGet,
  registerPost,
} from '../controllers/index.js';

const indexRouter = Router();

indexRouter.get('/', home);
indexRouter.get('/login', loginGet);
indexRouter.get('/register', registerGet);
indexRouter.post('/register', registerPost);

export default indexRouter;
