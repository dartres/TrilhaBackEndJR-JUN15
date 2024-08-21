import { openDb } from '../../src/database/configDB.js';

const UserModel = {
    async create(user) {
        const db = await openDb();
        const { name, email, password } = user;
        const result = await db.run(
            `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`,
            [name, email, password]
        );
        return result;
    },
    async list() {
        const db = await openDb();
        const users = await db.all('SELECT * FROM users');
        return users;
    },
    async getById(id) {
        const db = await openDb();
        const user = await db.get('SELECT * FROM users WHERE id = ?', [id]);
        return user;
    },
    async update(id, user) {
        const db = await openDb();
        const { name, email, password } = user;
        const result = await db.run(
            `UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?`,
            [name, email, password, id]
        );
        return result;
    },
    async delete(id) {
        const db = await openDb();
        const result = await db.run('DELETE FROM users WHERE id = ?', [id]);
        return result;
    }
};

export default UserModel;
