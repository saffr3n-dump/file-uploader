import { Router } from 'express';
import {
  uploadFileGet,
  uploadFilePost,
  downloadFile,
} from '../controllers/files.js';
import checkAuth from '../middlewares/check-auth.js';

const filesRouter = Router({ mergeParams: true });

filesRouter.get('/upload', checkAuth, uploadFileGet);
filesRouter.post('/upload', checkAuth, uploadFilePost);
filesRouter.get('/:fileId/download', checkAuth, downloadFile);

export default filesRouter;
