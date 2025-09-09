import { Router } from 'express';
import {
  uploadFileGet,
  uploadFilePost,
} from '../controllers/files.js';
import checkAuth from '../middlewares/check-auth.js';

const filesRouter = Router({ mergeParams: true });

filesRouter.get('/upload', checkAuth, uploadFileGet);
filesRouter.post('/upload', checkAuth, uploadFilePost);

export default filesRouter;
