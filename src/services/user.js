import bcrypt from 'bcryptjs';
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

  static async create({ name, password }) {
    const hash = await bcrypt.hash(password, 10);
    return await db.user.create({ data: { name, password: hash } });
  }
}
