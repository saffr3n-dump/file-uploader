import db from '../core/db.js';

export default class Folder {
  constructor() {
    throw new Error('Cannot create an instance of the static class Folder');
  }

  static findMany(userId) {
    return db.$queryRaw`
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
}
