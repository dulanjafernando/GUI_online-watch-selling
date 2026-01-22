require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 5000,
    JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret_key_here',
    JWT_EXPIRE: process.env.JWT_EXPIRE || '7d',
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_USER: process.env.DB_USER || 'root',
    DB_PASSWORD: process.env.DB_PASSWORD || '',
    DB_NAME: process.env.DB_NAME || 'watchdell_db',
    NODE_ENV: process.env.NODE_ENV || 'development',
    ADMIN_SECRET: process.env.ADMIN_SECRET || 'admin_secret_key'
};
