import { body, validationResult } from 'express-validator';
import Folder from '../services/folder.js';

const validateFolderName = () =>
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .bail()
    .custom(async (name) => {
      const folder = await Folder.findByName(name);
      if (folder) throw new Error('Name is already in use');
    });

export const listFolders = async (req, res) => {
  const folders = await Folder.findMany(req.user.id);
  res.render('list-folders', { folders });
};

export const createFolderGet = (_req, res) => {
  res.render('create-folder');
};

export const createFolderPost = [
  validateFolderName(),
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

export const viewFolder = async (req, res) => {
  const folder = await Folder.findById(Number(req.params.id));
  if (!folder) throw new Error('Folder not found');
  res.render('view-folder', { folder });
};

export const renameFolderGet = async (req, res) => {
  const folder = await Folder.findById(Number(req.params.id));
  if (!folder) throw new Error('Folder not found');
  res.render('rename-folder', { data: folder });
};

export const renameFolderPost = [
  validateFolderName(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render('rename-folder', {
        data: { ...req.params, ...req.body },
        errors: errors.mapped(),
      });
    }
    const folder = await Folder.rename(Number(req.params.id), req.body.name);
    res.redirect(`/folders/${folder.id}`);
  },
];

export const deleteFolderGet = async (req, res) => {
  const folder = await Folder.findById(Number(req.params.id));
  if (!folder) throw new Error('Folder not found');
  res.render('delete-folder', { data: folder });
};

export const deleteFolderPost = async (req, res) => {
  await Folder.delete(Number(req.params.id));
  res.redirect('/folders');
};
