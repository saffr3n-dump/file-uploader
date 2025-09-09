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
