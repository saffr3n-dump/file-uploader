import db from '../core/db.js';

export default class User {
  constructor() {
    throw new Error('Cannot create an instance of the static class User');
  }

  static async findById(id) {
    return await db.user.findUnique({ where: { id } });
  }

  static async findByName(name) {
    return await db.user.findUnique({ where: { name } });
  }
}
