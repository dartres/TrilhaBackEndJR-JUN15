import {openDb} from '../../src/database/configDB.js';

async function createTableUsers(){
    openDb().then(db=>(
        db.exec(
            'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT NOT NULL, email TEXT NOT NULL, password TEXT NOT NULL)'
        )
    ))
}

export { createTableUsers };