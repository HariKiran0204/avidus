# Avidus - MERN Task Management System with RBAC

A comprehensive full-stack application demonstrating role-based access control (RBAC) and activity logging in a MERN (MongoDB, Express, React, Node.js) stack.

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)
- Git

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Update MongoDB URI and JWT secret in `.env`

5. Start the backend server:
```bash
npm run dev
```

Server runs on `http://localhost:5000`

### Frontend Setup

1. In a new terminal, navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Start the frontend:
```bash
npm start
```

Application opens at `http://localhost:3000`

## 📋 Features

### User Authentication & Authorization
- ✅ JWT-based authentication
- ✅ Secure password hashing (bcryptjs)
- ✅ Role-based access control (Admin, User)
- ✅ Protected routes and endpoints
- ✅ User status management (Active/Inactive)

### User Management (Admin Only)
- ✅ View all users
- ✅ Update user status
- ✅ Delete users and associated tasks
- ✅ User statistics

### Task Management
- ✅ Create, read, update, delete tasks
- ✅ Task filtering (status, priority)
- ✅ Task assignment (Admin only)
- ✅ Task statistics

### Activity Logging
- ✅ Login/logout tracking
- ✅ Task operation logging
- ✅ User management action logging
- ✅ IP address and user agent tracking
- ✅ Activity statistics and reports

### Admin Dashboard
- ✅ User management interface
- ✅ Activity logs viewer
- ✅ Analytics and reports
- ✅ System-wide statistics

### Frontend UI
- ✅ Responsive design
- ✅ Role-based menu rendering
- ✅ Protected routes
- ✅ Reusable components
- ✅ Alert notifications

## 🏗️ Project Structure

```
Avidus/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── userController.js
│   │   │   ├── taskController.js
│   │   │   └── activityController.js
│   │   ├── middleware/
│   │   │   ├── auth.js
│   │   │   ├── activityLogger.js
│   │   │   └── validator.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Task.js
│   │   │   └── ActivityLog.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── userRoutes.js
│   │   │   ├── taskRoutes.js
│   │   │   └── activityRoutes.js
│   │   ├── utils/
│   │   │   └── jwt.js
│   │   └── server.js
│   ├── package.json
│   ├── .env.example
│   └── README.md
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ProtectedRoute.js
│   │   │   ├── Navbar.js
│   │   │   └── UI.js
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── pages/
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Dashboard.js
│   │   │   ├── Tasks.js
│   │   │   ├── AdminUsers.js
│   │   │   ├── AdminActivityLogs.js
│   │   │   └── AdminAnalytics.js
│   │   ├── styles/
│   │   ├── utils/
│   │   │   └── api.js
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   ├── package.json
│   ├── .env.example
│   └── README.md
│
├── .github/
│   └── copilot-instructions.md
│
└── README.md
```

## 🔑 Demo Credentials

### Admin Account
- Email: `admin@example.com`
- Password: `password123`
- Role: Admin
- Permissions: Full access to all features

### User Account
- Email: `user@example.com`
- Password: `password123`
- Role: User
- Permissions: Can manage own tasks only

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get current user |
| POST | `/api/auth/logout` | Logout user |

### Users (Admin Routes)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | Get all users |
| GET | `/api/users/:id` | Get user by ID |
| PUT | `/api/users/:id/profile` | Update user profile |
| PUT | `/api/users/:id/status` | Update user status (Admin) |
| DELETE | `/api/users/:id` | Delete user (Admin) |
| GET | `/api/users/stats/overview` | Get user statistics (Admin) |

### Tasks
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/tasks` | Create task |
| GET | `/api/tasks` | Get tasks |
| GET | `/api/tasks/:id` | Get task by ID |
| PUT | `/api/tasks/:id` | Update task |
| DELETE | `/api/tasks/:id` | Delete task |
| GET | `/api/tasks/stats/overview` | Get task statistics |

### Activity Logs (Admin Routes)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/activity-logs` | Get all activity logs (Admin) |
| GET | `/api/activity-logs/user/:userId` | Get user's activity logs |
| GET | `/api/activity-logs/stats/overview` | Get activity statistics (Admin) |

## 🔒 Role-Based Permissions

### Admin Permissions
- View and manage all users
- Update user status (Active/Inactive)
- Delete users
- View all tasks
- Delete any task
- View all activity logs
- View system analytics

### User Permissions
- Create own tasks
- View own tasks only
- Update own tasks
- Delete own tasks
- View own profile
- Update own profile
- View own activity logs

## 🛠️ Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT
- **Password Hashing**: bcryptjs
- **Validation**: express-validator
- **Logging**: Morgan

### Frontend
- **Library**: React 18
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **State Management**: Context API
- **Styling**: CSS-in-JS and CSS files

## 📝 Database Schema

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  role: String (enum: ['User', 'Admin']),
  status: String (enum: ['Active', 'Inactive']),
  profileImage: String,
  lastLogin: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Task Model
```javascript
{
  title: String (required),
  description: String,
  createdBy: ObjectId (ref: User),
  assignedTo: ObjectId (ref: User),
  status: String (enum: ['Pending', 'In Progress', 'Completed', 'Cancelled']),
  priority: String (enum: ['Low', 'Medium', 'High']),
  dueDate: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Activity Log Model
```javascript
{
  userId: ObjectId (ref: User),
  action: String (enum: [various actions]),
  description: String,
  taskId: ObjectId (ref: Task),
  targetUserId: ObjectId (ref: User),
  ipAddress: String,
  userAgent: String,
  statusCode: Number,
  details: Object,
  createdAt: Date
}
```

## 🔐 Security Features

- JWT token-based authentication
- Bcryptjs password hashing with salt
- Protected API endpoints
- Role-based access control middleware
- Input validation
- CORS configuration
- Activity logging for audit trail
- Inactive user account blocking

## 🚀 Deployment

### Backend Deployment (Heroku/Render)
1. Ensure all environment variables are set
2. Connect MongoDB Atlas
3. Deploy using git push

### Frontend Deployment (Vercel/Netlify)
1. Build the project: `npm run build`
2. Deploy the build folder
3. Configure environment variables
4. Set up automatic deployments from Git

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [React Documentation](https://react.dev/)
- [JWT Documentation](https://jwt.io/)

## 🤝 Contributing

1. Create a new branch for features
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📄 License

MIT License

## 👨‍💻 Developer

Created with ❤️ for demonstrating professional MERN development practices.

---

**Happy Coding! 🎉**
