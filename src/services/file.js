import db from '../core/db.js';
import storage from '../core/storage.js';

export default class File {
  constructor() {
    throw new Error('Cannot create an instance of the static class File');
  }

  static async findById(id) {
    return db.file.findUnique({ where: { id } });
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

  static async download(id, username) {
    const file = await db.file.findUnique({ where: { id } });
    if (!file) throw new Error('File not found');
    const { data, error } = await storage
      .from(username)
      .createSignedUrl(`${file.folderId}/${file.name}`, 60, { download: true });
    if (error) throw error;
    return data;
  }

  static async rename(id, name, username) {
    const file = await db.file.findUnique({ where: { id } });
    if (!file) throw new Error('File not found');
    const { error } = await storage
      .from(username)
      .move(`${file.folderId}/${file.name}`, `${file.folderId}/${name}`);
    if (error) throw error;
    return await db.file.update({ where: { id }, data: { name } });
  }

  static async delete(username, id) {
    const file = await db.file.findUnique({ where: { id } });
    if (!file) throw new Error('File not found');
    const { error } = await storage
      .from(username)
      .remove([`${file.folderId}/${file.name}`]);
    if (error) throw error;
    return await db.file.delete({ where: { id } });
  }
}
