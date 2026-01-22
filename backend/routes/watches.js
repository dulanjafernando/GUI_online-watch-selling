const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const watchController = require('../controllers/watchController');
const { verifyToken, isAdmin } = require('../middlewares/auth');

// Set up multer for file uploads
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

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

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// Public routes
router.get('/', watchController.getAllWatches);
router.get('/search', watchController.searchWatches);
router.get('/category/:category', watchController.getWatchesByCategory);
router.get('/:id', watchController.getWatchById);

// Admin only routes
router.post('/', verifyToken, isAdmin, upload.single('image'), watchController.addWatch);
router.put('/:id', verifyToken, isAdmin, upload.single('image'), watchController.updateWatch);
router.delete('/:id', verifyToken, isAdmin, watchController.deleteWatch);

// Error handling middleware for multer
router.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ message: 'File too large. Maximum size is 10MB.' });
        }
    } else if (error) {
        return res.status(400).json({ message: error.message });
    }
    next();
});

module.exports = router;
