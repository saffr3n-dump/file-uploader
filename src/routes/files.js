import { Router } from 'express';
import {
  uploadFileGet,
  uploadFilePost,
  downloadFile,
  renameFileGet,
  renameFilePost,
} from '../controllers/files.js';
import checkAuth from '../middlewares/check-auth.js';

const filesRouter = Router({ mergeParams: true });

filesRouter.get('/upload', checkAuth, uploadFileGet);
filesRouter.post('/upload', checkAuth, uploadFilePost);
filesRouter.get('/:fileId/download', checkAuth, downloadFile);
filesRouter.get('/:fileId/rename', checkAuth, renameFileGet);
filesRouter.post('/:fileId/rename', checkAuth, renameFilePost);

export default filesRouter;
