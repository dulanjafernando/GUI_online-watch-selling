require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const { PORT } = require('./config/environment');
const db = require('./config/database');
const User = require('./models/User');
const Watch = require('./models/Watch');
const Order = require('./models/Order');

// Import routes
const authRoutes = require('./routes/auth');
const watchRoutes = require('./routes/watches');
const orderRoutes = require('./routes/orders');

// Initialize Express app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS Configuration
const corsOptions = {
    origin: function (origin, callback) {
        const allowedOrigins = [
            'http://localhost:3000',
            'http://localhost:5173',
            'http://localhost:5174'
        ];
        
        // Allow requests with no origin (like mobile apps or Postman)
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

// Serve uploaded files as static files
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}
app.use('/uploads', express.static(uploadDir));

// Initialize database tables
const initializeTables = async () => {
    try {
        await User.createTable();
        await Watch.createTable();
        await Order.createTable();
        console.log('All tables initialized successfully');
    } catch (error) {
        console.error('Error initializing tables:', error);
    }
};

// Initialize tables on server start
initializeTables();

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/watches', watchRoutes);
app.use('/api/orders', orderRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ message: 'Server is running' });
});

// Root endpoint
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to WatchDell Backend API' });
});

// 404 Not Found middleware
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// Global error handling middleware
app.use((error, req, res, next) => {
    console.error('Error:', error);
    res.status(error.status || 500).json({
        message: error.message || 'Internal Server Error'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`\n========================================`);
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`========================================\n`);
});

module.exports = app;
