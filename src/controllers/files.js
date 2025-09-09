import multer from 'multer';

const memoryStorage = multer.memoryStorage();
const upload = multer({ storage: memoryStorage }).single('file');

export const uploadFileGet = (req, res) => {
  res.render('upload-file', { data: { ...req.params, ...req.body } });
};
