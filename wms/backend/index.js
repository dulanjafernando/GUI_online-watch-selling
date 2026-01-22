require('dotenv').config();  // Load environment variables from the .env file
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Serve uploaded files as static files
app.use('/uploads', express.static(uploadDir));

// Set up multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // Save files in the 'uploads/' directory
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Generate a unique filename
    }
});

// Define file type filter
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb(new Error('Only image files (JPG, PNG, GIF) are allowed'));
    }
};

// Set up multer with limits and file filter
const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 } // Limit file size to 10MB
});

// MySQL Connection to watchdell_db
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'watchdell_db'  // Connecting to the watchdell_db
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('MySQL Connected...');
        
        // Create the watches table if it doesn't exist
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS watch (
                _id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                image VARCHAR(255) NOT NULL,
                price DECIMAL(10, 2) NOT NULL,
                description TEXT,
                category VARCHAR(100) NOT NULL,
                available INT DEFAULT 0 NOT NULL 
            )
        `;

        db.query(createTableQuery, (err) => {
            if (err) {
                console.error('Error creating table:', err);
            } else {
                console.log('Watches table created or already exists.');
            }
        });
    }
});

// Fetch all watches
app.get('/watches', (req, res) => {
    const query = 'SELECT * FROM watch';
    db.query(query, (err, result) => {
        if (err) {
            console.error('Error fetching watches:', err);
            res.status(500).send('Error fetching watches');
        } else {
            res.json(result);
        }
    });
});

// Add a new watch
app.post('/add-watches', upload.single('image'), (req, res) => {
    try {
        const { name, price, description, category, available } = req.body;

        // Validate input fields
        if (!name || !price || !description || !category || available === undefined) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Validate if a file was uploaded
        let imagePath = '';
        if (req.file) {
            imagePath = `/uploads/${req.file.filename}`; // Publicly accessible URL
        } else {
            return res.status(400).json({ error: 'Image file is required' });
        }

        // Insert data into database
        const query = 'INSERT INTO watch (name, image, price, description, category, available) VALUES (?, ?, ?, ?, ?, ?)';
        db.query(query, [name, imagePath, price, description, category, available], (err, result) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ error: 'Error adding watch' });
            }
            res.status(201).json({ message: 'Watch added successfully', watchId: result.insertId, imageUrl: imagePath });
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).json({ error: 'Unexpected server error' });
    }
});

// Update a watch by ID
app.put('/update-watches/:id', upload.single('image'), (req, res) => {
    const { id } = req.params;
    const { name, price, description, category, available } = req.body;

    // Handle image update logic
    let imagePath = req.body.image; // If no new image is uploaded, use the existing one
    if (req.file) {
        imagePath = '/uploads/' + req.file.filename; // If a new image is uploaded, use the new image
    }

    const query = 'UPDATE watch SET name = ?, image = ?, price = ?, description = ?, category = ?, available = ? WHERE _id = ?';
    db.query(query, [name, imagePath, price, description, category, available, id], (err, result) => {
        if (err) {
            console.error('Error updating watch:', err);
            return res.status(500).send('Error updating watch');
        }

        if (result.affectedRows === 0) {
            return res.status(404).send('Watch not found');
        }

        res.status(200).send('Watch updated successfully');
    });
});

// Delete a watch by ID
app.delete('/delete-watches/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM watch WHERE _id = ?';
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
