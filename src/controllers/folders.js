import { body, validationResult } from 'express-validator';
import Folder from '../services/folder.js';

export const listFolders = async (req, res) => {
  const folders = await Folder.findMany(req.user.id);
  res.render('list-folders', { folders });
};

export const createFolderGet = (_req, res) => {
  res.render('create-folder');
};

export const createFolderPost = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .bail()
    .custom(async (name) => {
      const folder = await Folder.findByName(name);
      if (folder) throw new Error('Name is already in use');
    }),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render('create-folder', {
        data: req.body,
        errors: errors.mapped(),
      });
    }
    const folder = await Folder.create({
      name: req.body.name,
      userId: req.user.id,
    });
    res.redirect(`/folders/${folder.id}`);
  },
];
