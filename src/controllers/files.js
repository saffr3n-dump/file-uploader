export const uploadFileGet = (req, res) => {
  res.render('upload-file', { data: { ...req.params, ...req.body } });
};
