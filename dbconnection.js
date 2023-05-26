const mysql = require('mysql');

// DATABASE DETAILS
const databaseDetails = {
    host: '127.0.0.1',
    user: 'server',
    password: 'Banshee-Pristine-Encroach0',
    database: 'the-mobile-hour',
    multipleStatements: true
};

// connect to the database
const db = mysql.createConnection(databaseDetails);

// console log when the database has successfully connected or show the error
db.connect((err) => {
    if (err) throw err;
    console.log("Connected to database");
});

// export so that we can connect to the database from any file
module.exports = db;