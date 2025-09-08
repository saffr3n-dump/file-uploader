import { Router } from 'express';
import { uploadFileGet } from '../controllers/files.js';
import checkAuth from '../middlewares/check-auth.js';

const filesRouter = Router({ mergeParams: true });

filesRouter.get('/upload', checkAuth, uploadFileGet);

export default filesRouter;
