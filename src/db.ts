import sqlite from 'sqlite3'

const db = new sqlite.Database('database.db')

db.run(`
    CREATE TABLE IF NOT EXISTS accounts (
        id INTEGER PRIMARY KEY,
        username TEXT,
        hashedPassword TEXT,
        CONSTRAINT uniqueUsername UNIQUE(username)
    )
`)

export default db