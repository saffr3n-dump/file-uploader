import { Router } from 'express';
import {
  home,
  registerGet,
} from '../controllers/index.js';

const indexRouter = Router();

indexRouter.get('/', home);
indexRouter.get('/register', registerGet);

export default indexRouter;
