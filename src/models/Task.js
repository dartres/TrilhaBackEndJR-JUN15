import {openDb} from '../database/configDB.js';

const TaskModel = {
    async create(task) {
        const db = await openDb();
        const { title, content, done } = task;
        const result = await db.run(
            `INSERT INTO tasks (title, content, done) VALUES (?, ?, ?)`,
            [title, content, done]
        );
        return result;
    },
    async list() {
        const db = await openDb();
        const tasks = await db.all('SELECT * FROM tasks');
        return tasks;
    },
    async getById(id) {
        const db = await openDb();
        const task = await db.get('SELECT * FROM tasks WHERE id = ?', [id]);
        return task;
    },
    async update(query, values) {
        const db = await openDb();
        const result = await db.run(query, values);
        return result;
    },
    async delete(id) {
        const db = await openDb();
        const result = await db.run('DELETE FROM tasks WHERE id = ?', [id]);
        return result;
    }
};

export { TaskModel };
