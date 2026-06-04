# Avidus Backend

MERN Stack Backend with Role-Based Access Control and Activity Tracking

## Features

- **User Authentication & Authorization**
  - JWT-based authentication
  - Role-based access control (Admin, User)
  - Secure password hashing with bcryptjs

- **User Management**
  - Admin can view all users
  - Admin can update user status (Active/Inactive)
  - Admin can delete users
  - Users can update their own profiles

- **Task Management**
  - Users can create, read, update, delete their own tasks
  - Admin can manage all tasks
  - Task filtering by status and priority
  - Task assignment (Admin only)

- **Activity Logging**
  - Track login/logout activities
  - Track task operations (create, update, delete)
  - Track user management operations
  - Activity logs with metadata (IP, user agent)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

3. Update `.env` with your MongoDB URI and JWT secret

## Running the Server

Development mode with auto-reload:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout user

### Users
- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id/profile` - Update user profile
- `PUT /api/users/:id/status` - Update user status (Admin only)
- `DELETE /api/users/:id` - Delete user (Admin only)
- `GET /api/users/stats/overview` - Get user statistics (Admin only)

### Tasks
- `POST /api/tasks` - Create a task
- `GET /api/tasks` - Get tasks
- `GET /api/tasks/:id` - Get task by ID
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `GET /api/tasks/stats/overview` - Get task statistics

### Activity Logs
- `GET /api/activity-logs` - Get all activity logs (Admin only)
- `GET /api/activity-logs/user/:userId` - Get user's activity logs
- `GET /api/activity-logs/stats/overview` - Get activity statistics (Admin only)

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── taskController.js
│   │   └── activityController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── activityLogger.js
│   │   └── validator.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Task.js
│   │   └── ActivityLog.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   ├── taskRoutes.js
│   │   └── activityRoutes.js
│   ├── utils/
│   │   └── jwt.js
│   └── server.js
├── package.json
├── .env.example
└── .gitignore
```

## User Roles

### Admin
- View all users
- Update user status
- Delete users
- View all tasks
- Delete any task
- View activity logs
- View analytics

### User
- Create own tasks
- View own tasks only
- Update own tasks
- Delete own tasks
- View own activity logs
- Update own profile
