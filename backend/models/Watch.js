const db = require('../config/database');

class Watch {
    // Create watches table if it doesn't exist
    static createTable() {
        const query = `
            CREATE TABLE IF NOT EXISTS watch (
                _id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                image VARCHAR(255) NOT NULL,
                price DECIMAL(10, 2) NOT NULL,
                discount DECIMAL(5, 2) DEFAULT 0.00,
                description TEXT,
                category VARCHAR(100) NOT NULL,
                available INT DEFAULT 0 NOT NULL,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `;
        return new Promise((resolve, reject) => {
            db.query(query, (err) => {
                if (err) {
                    console.error('Error creating watch table:', err);
                    reject(err);
                } else {
                    console.log('Watches table created or already exists.');
                    // Check if discount column exists
                    const checkDiscountColumn = "SHOW COLUMNS FROM watch LIKE 'discount'";
                    db.query(checkDiscountColumn, (err, result) => {
                        if (err) {
                            console.error('Error checking discount column:', err);
                        } else if (result.length === 0) {
                            const addDiscountColumn = "ALTER TABLE watch ADD COLUMN discount DECIMAL(5, 2) DEFAULT 0.00 AFTER price";
                            db.query(addDiscountColumn, (err) => {
                                if (err) {
                                    console.error('Error adding discount column:', err);
                                } else {
                                    console.log('Discount column added successfully.');
                                }
                            });
                        }
                    });
                    resolve();
                }
            });
        });
    }

    // Get all watches
    static getAll() {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM watch';
            db.query(query, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    // Get watch by ID
    static getById(id) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM watch WHERE _id = ?';
            db.query(query, [id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result[0] || null);
                }
            });
        });
    }

    // Create new watch
    static create(name, image, price, discount, description, category, available) {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO watch (name, image, price, discount, description, category, available) VALUES (?, ?, ?, ?, ?, ?, ?)';
            db.query(query, [name, image, price, discount || 0, description, category, available], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({
                        _id: result.insertId,
                        name,
                        image,
                        price,
                        discount,
                        description,
                        category,
                        available
                    });
                }
            });
        });
    }

    // Update watch
    static update(id, name, image, price, discount, description, category, available) {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE watch SET name = ?, image = ?, price = ?, discount = ?, description = ?, category = ?, available = ? WHERE _id = ?';
            db.query(query, [name, image, price, discount || 0, description, category, available, id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    // Delete watch
    static delete(id) {
        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM watch WHERE _id = ?';
            db.query(query, [id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    // Get watches by category
    static getByCategory(category) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM watch WHERE category = ?';
            db.query(query, [category], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    // Search watches
    static search(searchTerm) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM watch WHERE name LIKE ? OR description LIKE ? OR category LIKE ?';
            const term = `%${searchTerm}%`;
            db.query(query, [term, term, term], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
}

module.exports = Watch;
