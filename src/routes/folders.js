import { Router } from 'express';
import {
  listFolders,
  createFolderGet,
} from '../controllers/folders.js';
import checkAuth from '../middlewares/check-auth.js';

const foldersRouter = Router();

foldersRouter.get('/', checkAuth, listFolders);
foldersRouter.get('/create', checkAuth, createFolderGet);

export default foldersRouter;
