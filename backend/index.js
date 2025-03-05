require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// MySQL Connection to watchdell_db
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: 'watchdell_db'  // Connecting to the watchdell_db
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('MySQL Connected...');
        
        // Create the watches table if it doesn't exist
        const createTableQuery = `
        CREATE TABLE IF NOT EXISTS watches (
            _id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            image VARCHAR(255) NOT NULL,
            price DECIMAL(10, 2) NOT NULL,
            description TEXT,
            category VARCHAR(100) NOT NULL
        )`;

        db.query(createTableQuery, (err) => {
            if (err) {
                console.error('Error creating table:', err);
            } else {
                console.log('Watches table created or already exists.');
            }
        });
    }
});
app.get('/watches', (req, res) => {
    const query = 'SELECT * FROM watches';
    db.query(query, (err, result) => {
      if (err) {
        console.error('Error fetching watches:', err);
        res.status(500).send('Error fetching watches');
      } else {
        console.log('Fetched Watches:', result);  // Log the result for debugging
        res.json(result);
      }
    });
  });

// Fetch a specific watch by ID
app.get('/watches/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM watches WHERE _id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error fetching watch:', err);
            res.status(500).send('Error fetching watch');
        } else {
            res.json(result[0]);
        }
    });
});

// Add a new watch
app.post('/add-watches', (req, res) => {
    const { name, image, price, description, category } = req.body;
    const query = 'INSERT INTO watches (name, image, price, description, category) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [name, image, price, description, category], (err, result) => {
        if (err) {
            console.error('Error adding watch:', err);
            res.status(500).send('Error adding watch');
        } else {
            res.status(201).send('Watch added successfully');
        }
    });
});

// Update a watch by ID
app.put('/update-watches/:id', (req, res) => {
    const { id } = req.params;
    const { name, image, price, description, category } = req.body;
    const query = 'UPDATE watches SET name = ?, image = ?, price = ?, description = ?, category = ? WHERE _id = ?';
    db.query(query, [name, image, price, description, category, id], (err, result) => {
        if (err) {
            console.error('Error updating watch:', err);
            res.status(500).send('Error updating watch');
        } else {
            res.send('Watch updated successfully');
        }
    });
});

// Delete a watch by ID
app.delete('/delete-watches/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM watches WHERE _id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error deleting watch:', err);
            res.status(500).send('Error deleting watch');
        } else {
            res.send('Watch deleted successfully');
        }
    });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
