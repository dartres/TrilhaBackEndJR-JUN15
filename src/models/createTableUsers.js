import { openDb } from '../../src/database/configDB.js';
import bcrypt from 'bcrypt';

async function createTableUsers() {
    try {
        const db = await openDb();
        await db.exec(
            `CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL
            )`
        );
        console.log('Tabela Users criada com sucesso ou já existe');
    } catch (error) {
        console.error('Erro ao criar tabela:', error);
    }
}

export { createTableUsers };
