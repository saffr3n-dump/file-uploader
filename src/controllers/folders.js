import Folder from '../services/folder.js';

export const listFolders = async (req, res) => {
  const folders = await Folder.findMany(req.user.id);
  res.render('list-folders', { folders });
};
