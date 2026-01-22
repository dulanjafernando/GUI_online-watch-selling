# Quick Start Guide

## 📋 Project Structure Overview

```
backend/
├── config/                          # Configuration files
│   ├── database.js                 # MySQL connection setup
│   └── environment.js              # Environment variables
│
├── models/                          # Data Models
│   ├── User.js                     # User model & authentication logic
│   └── Watch.js                    # Watch model & watch operations
│
├── controllers/                     # Business Logic
│   ├── authController.js           # Login/Register/Auth handlers
│   └── watchController.js          # Watch CRUD handlers
│
├── middlewares/                     # Middleware Functions
│   └── auth.js                     # JWT verification & role checking
│
├── routes/                          # API Routes
│   ├── auth.js                     # Auth endpoints
│   └── watches.js                  # Watch endpoints
│
├── uploads/                         # Uploaded Images Directory
│
├── server.js                        # Express App Main Setup
├── index.js                         # Entry Point
├── package.json                     # Dependencies
├── .env.example                     # Environment Template
├── API_DOCUMENTATION.md            # Detailed API Docs
├── API_USAGE_EXAMPLES.md           # Code Examples
└── RESTRUCTURING_SUMMARY.md        # What Was Changed
```

---

## 🚀 Getting Started (5 Minutes)

### Step 1: Install Dependencies
```bash
cd backend
npm install
```

### Step 2: Create .env File
Copy `.env.example` to `.env` and configure:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=watchdell_db
PORT=5000
JWT_SECRET=your_secret_key_here
ADMIN_SECRET=admin_key_here
```

### Step 3: Create MySQL Database
```sql
CREATE DATABASE watchdell_db;
```

### Step 4: Start the Server
```bash
# Development mode (auto-reload with nodemon)
npm run dev

# Or production mode
npm start
```

Server runs at: **http://localhost:5000**

---

## 🔑 Key Authentication Functions

### User Functions (Both Regular Users & Admins)
- ✅ **Register**: Create new account
- ✅ **Login**: Authenticate with email/password
- ✅ **Get Profile**: View current user info
- ✅ **Update Profile**: Change name, phone, address
- ✅ **Change Password**: Update password securely

### Admin-Only Functions
- ✅ **Add Watch**: Create new watch product
- ✅ **Edit Watch**: Update watch details
- ✅ **Delete Watch**: Remove watch from catalog
- ✅ **View All Users**: Manage user accounts

### Public Functions
- ✅ **Browse Watches**: View all watches
- ✅ **Search Watches**: Search by name/description
- ✅ **Filter by Category**: Browse by category

---

## 🧪 Quick Test

### Test 1: User Registration
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test123456",
    "confirmPassword": "Test123456",
    "firstName": "Test",
    "lastName": "User"
  }'
```

### Test 2: User Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test123456"
  }'
```

### Test 3: Get All Watches
```bash
curl http://localhost:5000/api/watches
```

---

## 📚 API Endpoint Summary

| Method | Endpoint | Description | Auth Required | Admin Only |
|--------|----------|-------------|---------------|-----------:|
| POST | `/api/auth/register` | User registration | No | No |
| POST | `/api/auth/login` | User login | No | No |
| POST | `/api/auth/admin/register` | Admin registration | No | No |
| POST | `/api/auth/admin/login` | Admin login | No | No |
| GET | `/api/auth/me` | Get current user | Yes | No |
| PUT | `/api/auth/profile` | Update profile | Yes | No |
| PUT | `/api/auth/change-password` | Change password | Yes | No |
| POST | `/api/auth/logout` | Logout | Yes | No |
| GET | `/api/watches` | Get all watches | No | No |
| GET | `/api/watches/:id` | Get watch by ID | No | No |
| GET | `/api/watches/search?q=...` | Search watches | No | No |
| GET | `/api/watches/category/:cat` | Get by category | No | No |
| POST | `/api/watches` | Add new watch | Yes | **Yes** |
| PUT | `/api/watches/:id` | Update watch | Yes | **Yes** |
| DELETE | `/api/watches/:id` | Delete watch | Yes | **Yes** |

---

## 🔐 How Authentication Works

1. **User registers/logins** → Receives JWT token
2. **Token sent in request** → As cookie or `Authorization: Bearer <token>` header
3. **Middleware verifies token** → Extracts user ID and role
4. **Route handler checks role** → Allows access if authorized

---

## 📝 File Reference

### Config Files
- **database.js**: Handles MySQL connection
- **environment.js**: Manages environment variables

### Model Files (Database Operations)
- **User.js**: User CRUD, password hashing, token generation
- **Watch.js**: Watch CRUD, search, filter operations

### Controller Files (Business Logic)
- **authController.js**: Authentication logic for users & admins
- **watchController.js**: Watch management logic

### Middleware Files (Request Processing)
- **auth.js**: JWT verification and role checking

### Route Files (API Endpoints)
- **auth.js**: `/api/auth/*` endpoints
- **watches.js**: `/api/watches/*` endpoints

---

## 🛠️ Development Tips

### Add a New Endpoint
1. Add method in controller (e.g., `controllers/authController.js`)
2. Add route in routes file (e.g., `routes/auth.js`)
3. Add middleware if authorization needed

### Add a New Field to User
1. Update `User.js` model - add to table creation SQL
2. Update controller to handle the new field
3. Update migration if database already exists

### Enable CORS for Frontend
Update `.env`:
```env
CORS_ORIGIN=http://localhost:3000
```

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| **Database connection failed** | Check MySQL is running: `mysql -u root` |
| **Port 5000 already in use** | Change PORT in .env or kill process: `netstat -ano \| findstr :5000` |
| **CORS errors** | Update CORS_ORIGIN in .env to match your frontend URL |
| **Token expired** | User needs to login again or increase JWT_EXPIRE in .env |
| **Admin registration fails** | Verify adminSecret matches value in .env |
| **File upload fails** | Check uploads folder exists and has write permissions |

---

## 📱 Frontend Integration

### Save Token After Login
```javascript
const response = await fetch('http://localhost:5000/api/auth/login', {...});
const data = await response.json();
localStorage.setItem('token', data.token);
```

### Send Token in Requests
```javascript
const token = localStorage.getItem('token');
fetch('http://localhost:5000/api/auth/me', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

---

## 📞 Support Files

- **API_DOCUMENTATION.md** - Complete API reference
- **API_USAGE_EXAMPLES.md** - Code examples for each endpoint
- **RESTRUCTURING_SUMMARY.md** - What changed from old structure

---

## ✨ What Was Changed

### From Old Structure:
- Everything was in `index.js` (220 lines)
- Mixed concerns (routes, database, configuration)
- Hard to maintain and extend
- No proper authentication system

### To New Structure:
- ✅ Separated concerns (config, models, controllers, routes)
- ✅ Full user authentication system
- ✅ Admin role support
- ✅ Password hashing with bcrypt
- ✅ JWT-based authentication
- ✅ Role-based access control
- ✅ Proper error handling
- ✅ Scalable architecture

---

## 🎉 You're All Set!

Your backend is now:
- ✅ Organized with clean MVC architecture
- ✅ Ready for authentication (users & admins)
- ✅ Scalable and maintainable
- ✅ Production-ready with proper security

Start your server and test the endpoints!
