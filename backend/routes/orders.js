const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { verifyToken, isAdmin } = require('../middlewares/auth');

// Create a new order (requires authentication)
router.post('/', verifyToken, orderController.createOrder);

// Get user's orders (requires authentication)
router.get('/user', verifyToken, orderController.getUserOrders);

// Get all orders (admin only)
router.get('/admin/all', verifyToken, isAdmin, orderController.getAllOrders);

// Get order by ID (user can see their own, admin can see all)
router.get('/:orderId', verifyToken, orderController.getOrderById);

// Update order status (admin only)
router.put('/:orderId/status', verifyToken, isAdmin, orderController.updateOrderStatus);

// Delete order (admin only)
router.delete('/:orderId', verifyToken, isAdmin, orderController.deleteOrder);

module.exports = router;
