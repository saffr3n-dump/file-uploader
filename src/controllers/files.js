import { body, validationResult } from 'express-validator';
import multer from 'multer';
import File from '../services/file.js';

const memoryStorage = multer.memoryStorage();
const upload = multer({ storage: memoryStorage }).single('file');

export const uploadFileGet = (req, res) => {
  res.render('upload-file', { data: { ...req.params, ...req.body } });
};

export const uploadFilePost = [
  (req, res, next) => {
    upload(req, res, (err) => {
      if (err) return next(err);
      req.body.filename = req.file?.originalname;
      next();
    });
  },

  body('filename')
    .trim()
    .notEmpty()
    .withMessage('File is required')
    .bail()
    .custom(async (filename, { req }) => {
      const file = await File.findByName(filename, Number(req.params.folderId));
      if (file) throw new Error('Name is already in use in this folder');
    }),

  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render('upload-file', {
        data: { ...req.params, ...req.body },
        errors: errors.mapped(),
      });
    }
    await File.upload({
      file: req.file.buffer,
      type: req.file.mimetype,
      name: req.file.originalname,
      size: req.file.size,
      folderId: Number(req.params.folderId),
      username: req.user.name,
    });
    memoryStorage._removeFile(req, req.file, (err) => {
      if (err) return next(err);
      res.redirect(`/folders/${req.params.folderId}`);
    });
  },
];

export const downloadFile = async (req, res) => {
  const file = await File.download(Number(req.params.fileId), req.user.name);
  res.redirect(file.signedUrl);
};

export const renameFileGet = async (req, res) => {
  const file = await File.findById(Number(req.params.fileId));
  if (!file) throw new Error('File not found');
  res.render('rename-file', { data: file });
};

export const renameFilePost = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('File is required')
    .bail()
    .custom(async (filename, { req }) => {
      const file = await File.findByName(filename, Number(req.params.folderId));
      if (file) throw new Error('Name is already in use in this folder');
    }),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render('rename-file', {
        data: { ...req.params, ...req.body },
        errors: errors.mapped(),
      });
    }
    const file = await File.rename(
      Number(req.params.fileId),
      req.body.name,
      req.user.name,
    );
    res.redirect(`/folders/${file.folderId}`);
  },
];

export const deleteFileGet = async (req, res) => {
  const file = await File.findById(Number(req.params.fileId));
  if (!file) throw new Error('File not found');
  res.render('delete-file', { data: file });
};

export const deleteFilePost = async (req, res) => {
  await File.delete(req.user.name, Number(req.params.fileId));
  res.redirect(`/folders/${req.params.folderId}`);
};
