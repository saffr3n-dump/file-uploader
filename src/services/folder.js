import db from '../core/db.js';
import storage from '../core/storage.js';

export default class Folder {
  constructor() {
    throw new Error('Cannot create an instance of the static class Folder');
  }

  static async findMany(userId) {
    return await db.$queryRaw`
      SELECT
        fo.id,
        fo.name,
        COUNT(fi.id) AS "fileCount",
        COALESCE(SUM(fi.size), 0) AS "totalSize"
      FROM public."Folder" AS fo
      LEFT JOIN public."File" AS fi
        ON fi."folderId" = fo.id
      WHERE fo."userId" = ${userId}
      GROUP BY fo.id
      ORDER BY fo.name;
    `;
  }

  static async findById(id) {
    return await db.folder.findUnique({
      where: { id },
      include: { files: true },
    });
  }

  static async findByName(name) {
    return await db.folder.findUnique({ where: { name } });
  }

  static async create({ name, userId }) {
    return await db.folder.create({ data: { name, userId } });
  }

  static async rename(id, name) {
    return await db.folder.update({ where: { id }, data: { name } });
  }

  static async delete(username, id) {
    const files = await db.file.findMany({ where: { folderId: id } });
    const { error } = await storage
      .from(username)
      .remove(files.map((file) => `${id}/${file.name}`));
    if (error) throw error;
    return await db.folder.delete({ where: { id } });
  }
}
