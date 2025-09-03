import { Router } from 'express';
import { home } from '../controllers/index.js';

const indexRouter = Router();

indexRouter.get('/', home);

export default indexRouter;
