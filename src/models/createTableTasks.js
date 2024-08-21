import { openDb } from '../../src/database/configDB.js';

async function createTableTasks() {
    try {
        const db = await openDb();
        await db.exec(
            `CREATE TABLE IF NOT EXISTS tasks (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                content TEXT NOT NULL UNIQUE,
                done INTEGER NOT NULL CHECK (done IN (0, 1))
            )`
        );
        console.log('Tabela Tasks criada com sucesso ou já existe');
    } catch (error) {
        console.error('Erro ao criar tabela:', error);
    }
}

export { createTableTasks };
