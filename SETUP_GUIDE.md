# 📖 Complete Setup Guide - Avidus MERN Application

This guide will walk you through setting up the complete Avidus application from scratch.

## 📋 Prerequisites

Before starting, ensure you have:
- **Node.js** v14 or higher ([Download](https://nodejs.org/))
- **MongoDB** v4.4 or higher (local or MongoDB Atlas)
- **Git** v2.30 or higher ([Download](https://git-scm.com/))
- **VS Code** or any code editor
- **Postman** (optional, for API testing)

## 🗄️ MongoDB Setup

### Option 1: Local MongoDB
1. Install MongoDB from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Start MongoDB service:
   ```bash
   # On Windows
   net start MongoDB
   
   # On Mac
   brew services start mongodb-community
   
   # On Linux
   sudo systemctl start mongod
   ```

### Option 2: MongoDB Atlas (Cloud)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a cluster
4. Get connection string
5. Use this URL in `.env` file

## 🚀 Backend Setup

### Step 1: Navigate to Backend Directory
```bash
cd backend
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Create Environment File
```bash
cp .env.example .env
```

### Step 4: Configure Environment Variables
Edit `.env` file with:
```
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/avidus
# OR use MongoDB Atlas
MONGODB_ATLAS_URI=mongodb+srv://username:password@cluster.mongodb.net/avidus

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345
JWT_EXPIRE=7d

# Server Configuration
PORT=5000
NODE_ENV=development

# CORS
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001
```

### Step 5: Start Backend Server
```bash
# Development mode with auto-reload
npm run dev

# OR production mode
npm start
```

You should see:
```
MongoDB Connected: localhost
Server running on port 5000
```

### Step 6: Seed Database (Optional)
```bash
node seed.js
```

This creates demo users and tasks:
- Admin: admin@example.com / password123
- User: user@example.com / password123

## 🎨 Frontend Setup

### Step 1: Navigate to Frontend Directory
In a new terminal:
```bash
cd frontend
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Create Environment File
```bash
cp .env.example .env
```

### Step 4: Configure Environment Variables
Edit `.env` file:
```
REACT_APP_API_URL=http://localhost:5000/api
```

### Step 5: Start Frontend Application
```bash
npm start
```

The application automatically opens at `http://localhost:3000`

## 🧪 Testing the Application

### Using the UI
1. Go to `http://localhost:3000`
2. Click "Login" link or go to `/login`
3. Use demo credentials:
   - Admin: admin@example.com / password123
   - User: user@example.com / password123

### Using Postman

1. Create a new request collection
2. Set base URL: `http://localhost:5000/api`

#### Login Request
```http
POST /auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "password123"
}
```

Copy the token from response and use in other requests:
```
Authorization: Bearer {token}
```

#### Get All Users (Admin Only)
```http
GET /users
Authorization: Bearer {token}
```

#### Create Task
```http
POST /tasks
Content-Type: application/json
Authorization: Bearer {token}

{
  "title": "My First Task",
  "description": "This is a test task",
  "priority": "High",
  "dueDate": "2024-12-31"
}
```

## 📱 Application Pages

### Public Pages
- **Login**: `/login` - User authentication
- **Register**: `/register` - New user registration

### Protected Pages (All Users)
- **Dashboard**: `/dashboard` - Main dashboard with stats
- **Tasks**: `/tasks` - Task management interface

### Admin Pages (Admin Only)
- **User Management**: `/admin/users` - Manage all users
- **Activity Logs**: `/admin/activity` - View system activity
- **Analytics**: `/admin/analytics` - System statistics

## 🔑 Key Features to Test

### 1. User Authentication
- [ ] Register new account
- [ ] Login with credentials
- [ ] View logged-in user info
- [ ] Logout functionality

### 2. Task Management
- [ ] Create a new task
- [ ] View all tasks
- [ ] Update task status/priority
- [ ] Delete task
- [ ] Filter tasks by status

### 3. Admin Features
- [ ] View all users (Admin only)
- [ ] Deactivate/Activate users
- [ ] Delete users
- [ ] View activity logs
- [ ] Check analytics dashboard

### 4. Activity Logging
- [ ] Login action is logged
- [ ] Task creation is logged
- [ ] User management actions are logged
- [ ] Activity logs show correct timestamps

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Find process using port 5000
lsof -i :5000

# Kill process on Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### MongoDB Connection Error
- Check if MongoDB is running
- Verify connection string in `.env`
- Ensure MongoDB credentials are correct

### Frontend Can't Connect to Backend
- Verify backend is running on `http://localhost:5000`
- Check CORS settings in `.env`
- Verify `REACT_APP_API_URL` in frontend `.env`

### Port 3000 Already in Use
```bash
npm start -- --port 3001
```

## 📦 Project Structure Summary

```
Avidus/
├── backend/
│   ├── src/
│   │   ├── models/ (MongoDB schemas)
│   │   ├── controllers/ (Business logic)
│   │   ├── routes/ (API endpoints)
│   │   ├── middleware/ (Auth, logging)
│   │   ├── config/ (Database config)
│   │   └── utils/ (Helper functions)
│   ├── seed.js (Sample data)
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── pages/ (React pages)
│   │   ├── components/ (Reusable components)
│   │   ├── context/ (State management)
│   │   ├── utils/ (API calls)
│   │   └── styles/ (CSS)
│   └── package.json
└── README.md
```

## 📚 API Reference

### Authentication Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout user

### User Endpoints
- `GET /api/users` - Get all users (Admin)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id/profile` - Update profile
- `PUT /api/users/:id/status` - Update status (Admin)
- `DELETE /api/users/:id` - Delete user (Admin)

### Task Endpoints
- `POST /api/tasks` - Create task
- `GET /api/tasks` - Get tasks
- `GET /api/tasks/:id` - Get task by ID
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Activity Endpoints
- `GET /api/activity-logs` - Get activity logs (Admin)
- `GET /api/activity-logs/user/:userId` - Get user activity

## 🔒 Security Notes

- Never commit `.env` files with sensitive data
- Change JWT_SECRET in production
- Use MongoDB Atlas for production
- Enable HTTPS in production
- Implement rate limiting
- Validate all user inputs

## 🎯 Next Steps

1. **Test All Features**: Go through the application and test all functionality
2. **Customize Styling**: Modify CSS in `frontend/src/styles/`
3. **Add More Features**: Extend with notifications, file uploads, etc.
4. **Deploy**: Deploy backend to Heroku/Render, frontend to Vercel/Netlify
5. **Monitor**: Set up logging and monitoring in production

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review the code comments
3. Check backend/README.md and frontend/README.md
4. Verify all environment variables are set correctly

## 🎉 You're All Set!

Your Avidus application is ready to use! 

Happy coding! 💻
