import db from '../core/db.js';
import storage from '../core/storage.js';

export default class File {
  constructor() {
    throw new Error('Cannot create an instance of the static class File');
  }

  static async findByName(name, folderId) {
    return await db.file.findUnique({
      where: { folderId_name: { name, folderId } },
    });
  }

  static async upload({ file, type, name, size, folderId, username }) {
    const { error } = await storage
      .from(username)
      .upload(`${folderId}/${name}`, file, { contentType: type });
    if (error) throw error;
    return await db.file.create({ data: { name, size, folderId } });
  }
}
