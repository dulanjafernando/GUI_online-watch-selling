const db = require('../config/database');
const bcrypt = require('bcrypt');

class User {
    // Create users table if it doesn't exist
    static createTable() {
        const query = `
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                firstName VARCHAR(100),
                lastName VARCHAR(100),
                phone VARCHAR(15),
                address TEXT,
                role ENUM('user', 'admin') DEFAULT 'user',
                isActive BOOLEAN DEFAULT true,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `;
        return new Promise((resolve, reject) => {
            db.query(query, (err) => {
                if (err) {
                    console.error('Error creating users table:', err);
                    reject(err);
                } else {
                    console.log('Users table created or already exists.');
                    resolve();
                }
            });
        });
    }

    // Register a new user
    static async register(email, password, firstName, lastName, phone, address, role = 'user') {
        return new Promise(async (resolve, reject) => {
            try {
                // Hash password
                const hashedPassword = await bcrypt.hash(password, 10);

                const query = 'INSERT INTO users (email, password, firstName, lastName, phone, address, role) VALUES (?, ?, ?, ?, ?, ?, ?)';
                db.query(query, [email, hashedPassword, firstName, lastName, phone, address, role], (err, result) => {
                    if (err) {
                        if (err.code === 'ER_DUP_ENTRY') {
                            reject({ code: 'DUPLICATE_EMAIL', message: 'Email already exists' });
                        } else {
                            reject(err);
                        }
                    } else {
                        resolve({
                            id: result.insertId,
                            email,
                            firstName,
                            lastName,
                            role
                        });
                    }
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    // Find user by email
    static findByEmail(email) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM users WHERE email = ?';
            db.query(query, [email], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result[0] || null);
                }
            });
        });
    }

    // Find user by ID
    static findById(id) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT id, email, firstName, lastName, phone, address, role, isActive FROM users WHERE id = ?';
            db.query(query, [id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result[0] || null);
                }
            });
        });
    }

    // Verify password
    static async verifyPassword(password, hashedPassword) {
        return bcrypt.compare(password, hashedPassword);
    }

    // Update user profile
    static updateProfile(userId, firstName, lastName, phone, address) {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE users SET firstName = ?, lastName = ?, phone = ?, address = ? WHERE id = ?';
            db.query(query, [firstName, lastName, phone, address, userId], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    // Change password
    static async changePassword(userId, newPassword) {
        return new Promise(async (resolve, reject) => {
            try {
                const hashedPassword = await bcrypt.hash(newPassword, 10);
                const query = 'UPDATE users SET password = ? WHERE id = ?';
                db.query(query, [hashedPassword, userId], (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    // Get all users (admin only)
    static getAllUsers() {
        return new Promise((resolve, reject) => {
            const query = 'SELECT id, email, firstName, lastName, phone, role, isActive, createdAt FROM users';
            db.query(query, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
}

module.exports = User;
