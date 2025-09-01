import { Router } from 'express';
import { home } from '../controllers.js';

const indexRouter = Router();

indexRouter.get('/', home);

export default indexRouter;
