import {openDb} from '../database/configDB.js';

async function createTableTasks(){
    openDb().then(db=>(
        db.exec(
            'CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY, title TEXT NOT NULL, content TEXT NOT NULL, done INTEGER NOT NULL CHECK (done IN (0, 1)))'
        )
    ))
}

export { createTableTasks };