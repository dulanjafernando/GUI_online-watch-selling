const db = require('../config/database');

class Order {
    // Create orders table if it doesn't exist
    static createTable() {
        const query = `
            CREATE TABLE IF NOT EXISTS orders (
                id INT AUTO_INCREMENT PRIMARY KEY,
                userId INT NOT NULL,
                userEmail VARCHAR(255) NOT NULL,
                firstName VARCHAR(100),
                lastName VARCHAR(100),
                email VARCHAR(255),
                street VARCHAR(255),
                city VARCHAR(100),
                state VARCHAR(100),
                zipCode VARCHAR(20),
                country VARCHAR(100),
                phone VARCHAR(15),
                items JSON NOT NULL,
                subtotal DECIMAL(10, 2) NOT NULL,
                savingsAmount DECIMAL(10, 2) DEFAULT 0,
                deliveryFee DECIMAL(10, 2) DEFAULT 0,
                totalAmount DECIMAL(10, 2) NOT NULL,
                status ENUM('rendering', 'confirmed', 'preparing', 'ready_to_deliver', 'delivered', 'cancelled') DEFAULT 'rendering',
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
            )
        `;
        return new Promise((resolve, reject) => {
            db.query(query, (err) => {
                if (err) {
                    console.error('Error creating orders table:', err);
                    reject(err);
                } else {
                    console.log('Orders table created or already exists.');
                    // Check if status column needs updating
                    const checkStatus = "SHOW COLUMNS FROM orders LIKE 'status'";
                    db.query(checkStatus, (err, result) => {
                        if (!err && result.length > 0) {
                            const modifyStatus = "ALTER TABLE orders MODIFY status ENUM('rendering', 'confirmed', 'preparing', 'ready_to_deliver', 'delivered', 'cancelled') DEFAULT 'rendering'";
                            db.query(modifyStatus, (err) => {
                                if (err) {
                                    console.log('Status column already updated or update not needed');
                                } else {
                                    console.log('Status enum updated successfully.');
                                }
                            });
                        }
                    });
                    resolve();
                }
            });
        });
    }

    // Create a new order
    static async createOrder(userId, userEmail, deliveryInfo, items, subtotal, savingsAmount, deliveryFee, totalAmount) {
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO orders (
                    userId, userEmail, firstName, lastName, email, street, city, state, 
                    zipCode, country, phone, items, subtotal, savingsAmount, deliveryFee, totalAmount, status
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;
            
            const values = [
                userId,
                userEmail,
                deliveryInfo.firstName || null,
                deliveryInfo.lastName || null,
                deliveryInfo.email || null,
                deliveryInfo.street || null,
                deliveryInfo.city || null,
                deliveryInfo.state || null,
                deliveryInfo.zipCode || null,
                deliveryInfo.country || null,
                deliveryInfo.phone || null,
                JSON.stringify(items),
                subtotal,
                savingsAmount || 0,
                deliveryFee || 0,
                totalAmount,
                'completed' // Mark as completed since payment is done
            ];

            db.query(query, values, (err, result) => {
                if (err) {
                    console.error('Error creating order:', err);
                    reject(err);
                } else {
                    resolve({ id: result.insertId, ...{ userId, userEmail, items, subtotal, savingsAmount, deliveryFee, totalAmount } });
                }
            });
        });
    }

    // Get orders by user ID
    static async getUserOrders(userId) {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT * FROM orders 
                WHERE userId = ? 
                ORDER BY createdAt DESC
            `;
            
            db.query(query, [userId], (err, results) => {
                if (err) {
                    console.error('Error fetching user orders:', err);
                    reject(err);
                } else {
                    // Parse JSON items for each order
                    const orders = results.map(order => ({
                        ...order,
                        items: order.items ? JSON.parse(order.items) : []
                    }));
                    resolve(orders);
                }
            });
        });
    }

    // Get all orders (for admin)
    static async getAllOrders() {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT * FROM orders 
                ORDER BY createdAt DESC
            `;
            
            db.query(query, (err, results) => {
                if (err) {
                    console.error('Error fetching all orders:', err);
                    reject(err);
                } else {
                    // Parse JSON items for each order
                    const orders = results.map(order => ({
                        ...order,
                        items: order.items ? JSON.parse(order.items) : []
                    }));
                    resolve(orders);
                }
            });
        });
    }

    // Get single order by ID
    static async getOrderById(orderId) {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT * FROM orders 
                WHERE id = ?
            `;
            
            db.query(query, [orderId], (err, results) => {
                if (err) {
                    console.error('Error fetching order:', err);
                    reject(err);
                } else if (results.length === 0) {
                    reject({ message: 'Order not found' });
                } else {
                    const order = results[0];
                    resolve({
                        ...order,
                        items: order.items ? JSON.parse(order.items) : []
                    });
                }
            });
        });
    }

    // Update order status
    static async updateOrderStatus(orderId, status) {
        return new Promise((resolve, reject) => {
            const query = `
                UPDATE orders 
                SET status = ?, updatedAt = CURRENT_TIMESTAMP
                WHERE id = ?
            `;
            
            db.query(query, [status, orderId], (err, result) => {
                if (err) {
                    console.error('Error updating order status:', err);
                    reject(err);
                } else {
                    resolve({ message: 'Order status updated successfully' });
                }
            });
        });
    }

    // Delete order
    static async deleteOrder(orderId) {
        return new Promise((resolve, reject) => {
            const query = `DELETE FROM orders WHERE id = ?`;
            
            db.query(query, [orderId], (err, result) => {
                if (err) {
                    console.error('Error deleting order:', err);
                    reject(err);
                } else if (result.affectedRows === 0) {
                    reject({ message: 'Order not found' });
                } else {
                    resolve({ message: 'Order deleted successfully' });
                }
            });
        });
    }
}

module.exports = Order;
