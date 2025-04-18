const fs = require('fs');

const dbFile = "./chat.db"
const exists = fs.existsSync(dbFile);
const sqlite3 = require('sqlite3').verbose();
const dbWrapper = require('sqlite3');
let db

dbWrapper
    .open({
        filename: dbFile,
        driver: sqlite3.Database
    })
    .then(async dBase => {
        db = dBase
        try {
            if (!exists) {
                await db.run(
                    `CREATE TABLE user(
                    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
                    login TEXT,
                    password TEXT)`
                );
                await db.run(
                    `INSERT INTO user(login, password) VALUES
                    ('admin', 'admin'),
                    ('JavaScript', 'JavaScript'),
                    ('user1', 'password1')`
                );
                await db.run(
                    `CREATE TABLE message(
                    msg_id INTEGER PRIMARY KEY AUTOINCREMENT,
                    content TEXT,
                    author INTEGER,
                    FOREIGN KEY(author) REFERENCES user(user_id))`
                );
            } else {
                console.log(await db.all("SELECT * FROM user"));
            }
        } catch (dbError) {
            console.log(dbError);
        }
    })