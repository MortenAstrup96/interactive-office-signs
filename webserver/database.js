const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./db/office.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
});
// Remember to close the DB with db.close()
// Website with tutorial: https://www.sqlitetutorial.net/sqlite-nodejs/connect/

