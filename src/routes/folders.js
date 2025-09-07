import { Router } from 'express';
import { listFolders } from '../controllers/folders.js';
import checkAuth from '../middlewares/check-auth.js';

const foldersRouter = Router();

foldersRouter.get('/', checkAuth, listFolders);

export default foldersRouter;
