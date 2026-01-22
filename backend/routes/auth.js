const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { verifyToken, isAdmin } = require('../middlewares/auth');

// Public routes
router.post('/register', authController.userRegister);
router.post('/login', authController.userLogin);
router.post('/admin/register', authController.adminRegister);
router.post('/admin/login', authController.adminLogin);

// Protected routes
router.post('/logout', verifyToken, authController.logout);
router.get('/me', verifyToken, authController.getCurrentUser);
router.put('/profile', verifyToken, authController.updateProfile);
router.put('/change-password', verifyToken, authController.changePassword);

module.exports = router;
