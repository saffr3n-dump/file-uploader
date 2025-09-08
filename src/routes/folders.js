import { Router } from 'express';
import {
  listFolders,
  createFolderGet,
  createFolderPost,
  viewFolder,
  renameFolderGet,
  renameFolderPost,
} from '../controllers/folders.js';
import checkAuth from '../middlewares/check-auth.js';

const foldersRouter = Router();

foldersRouter.get('/', checkAuth, listFolders);
foldersRouter.get('/create', checkAuth, createFolderGet);
foldersRouter.post('/create', checkAuth, createFolderPost);
foldersRouter.get('/:id', checkAuth, viewFolder);
foldersRouter.get('/:id/rename', renameFolderGet);
foldersRouter.post('/:id/rename', renameFolderPost);

export default foldersRouter;
