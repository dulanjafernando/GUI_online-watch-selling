const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
    try {
        const { userId, userEmail, deliveryInfo, items, subtotal, savingsAmount, deliveryFee, totalAmount } = req.body;

        // Validate required fields
        if (!userId || !items || items.length === 0 || !totalAmount) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Create order in database
        const order = await Order.createOrder(
            userId,
            userEmail,
            deliveryInfo,
            items,
            subtotal,
            savingsAmount,
            deliveryFee,
            totalAmount
        );

        res.status(201).json({
            message: 'Order placed successfully',
            orderId: order.id,
            order
        });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ message: 'Error creating order', error: error.message });
    }
};

exports.getUserOrders = async (req, res) => {
    try {
        const userId = req.userId;

        if (!userId) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        const orders = await Order.getUserOrders(userId);

        res.status(200).json({
            message: 'Orders retrieved successfully',
            orders,
            count: orders.length
        });
    } catch (error) {
        console.error('Error fetching user orders:', error);
        res.status(500).json({ message: 'Error fetching orders', error: error.message });
    }
};

exports.getAllOrders = async (req, res) => {
    try {
        // Check if user is admin
        if (req.userRole !== 'admin') {
            return res.status(403).json({ message: 'Forbidden: Admin access required' });
        }

        const orders = await Order.getAllOrders();

        res.status(200).json({
            message: 'All orders retrieved successfully',
            orders,
            count: orders.length
        });
    } catch (error) {
        console.error('Error fetching all orders:', error);
        res.status(500).json({ message: 'Error fetching orders', error: error.message });
    }
};

exports.getOrderById = async (req, res) => {
    try {
        const { orderId } = req.params;
        const userId = req.userId;

        const order = await Order.getOrderById(orderId);

        // Check if user is admin or the order belongs to them
        if (req.userRole !== 'admin' && order.userId !== userId) {
            return res.status(403).json({ message: 'Forbidden: You do not have access to this order' });
        }

        res.status(200).json({
            message: 'Order retrieved successfully',
            order
        });
    } catch (error) {
        console.error('Error fetching order:', error);
        res.status(error.message === 'Order not found' ? 404 : 500).json({ 
            message: error.message || 'Error fetching order', 
            error: error.message 
        });
    }
};

exports.updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        // Check if user is admin
        if (req.userRole !== 'admin') {
            return res.status(403).json({ message: 'Forbidden: Admin access required' });
        }

        // Validate status
        const validStatuses = ['rendering', 'confirmed', 'preparing', 'ready_to_deliver', 'delivered', 'cancelled'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        await Order.updateOrderStatus(orderId, status);

        res.status(200).json({ message: 'Order status updated successfully' });
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).json({ message: 'Error updating order status', error: error.message });
    }
};

exports.deleteOrder = async (req, res) => {
    try {
        const { orderId } = req.params;

        // Check if user is admin
        if (req.userRole !== 'admin') {
            return res.status(403).json({ message: 'Forbidden: Admin access required' });
        }

        await Order.deleteOrder(orderId);

        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        console.error('Error deleting order:', error);
        res.status(error.message === 'Order not found' ? 404 : 500).json({ 
            message: error.message || 'Error deleting order',
            error: error.message 
        });
    }
};
