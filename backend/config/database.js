const mysql = require('mysql');
require('dotenv').config();

const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'watchdell_db'
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        setTimeout(() => db.connect(), 2000); // Retry connection after 2 seconds
    } else {
        console.log('MySQL Connected...');
    }
});

// Handle connection errors after connection is established
db.on('error', (err) => {
    console.error('Database error:', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        db.connect();
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
        db.connect();
    }
    if (err.code === 'ECONNREFUSED') {
        db.connect();
    }
});

module.exports = db;
