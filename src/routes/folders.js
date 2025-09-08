import { Router } from 'express';
import {
  listFolders,
  createFolderGet,
  createFolderPost,
} from '../controllers/folders.js';
import checkAuth from '../middlewares/check-auth.js';

const foldersRouter = Router();

foldersRouter.get('/', checkAuth, listFolders);
foldersRouter.get('/create', checkAuth, createFolderGet);
foldersRouter.post('/create', checkAuth, createFolderPost);

export default foldersRouter;
