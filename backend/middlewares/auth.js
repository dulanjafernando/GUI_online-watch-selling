const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/environment');

// Verify JWT token middleware
const verifyToken = (req, res, next) => {
    const token = req.cookies.authToken || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided. Please login.' });
    }

    // Allow hardcoded admin token (for frontend-only admin login)
    if (token && token.startsWith('admin-token-')) {
        req.userId = 'admin';
        req.userRole = 'admin';
        return next();
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.id;
        req.userRole = decoded.role;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

// Verify admin role
const isAdmin = (req, res, next) => {
    if (req.userRole !== 'admin') {
        return res.status(403).json({ message: 'Forbidden: Admin access required' });
    }
    next();
};

// Verify user role
const isUser = (req, res, next) => {
    if (req.userRole !== 'user' && req.userRole !== 'admin') {
        return res.status(403).json({ message: 'Forbidden: User access required' });
    }
    next();
};

module.exports = {
    verifyToken,
    isAdmin,
    isUser
};
