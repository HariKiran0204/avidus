# Avidus Frontend

React-based frontend for MERN Application with Role-Based Access Control and Activity Tracking

## Features

- **Authentication**
  - User registration and login
  - JWT token-based authentication
  - Protected routes

- **User Interface**
  - Responsive design
  - Role-based UI rendering
  - Dashboard with analytics
  - Task management interface

- **Pages**
  - Login/Register
  - Dashboard
  - Tasks Management
  - Admin User Management
  - Admin Activity Logs
  - Admin Analytics

- **Components**
  - Reusable UI components
  - Protected route components
  - Navigation bar with role-based menu
  - Tables, pagination, alerts, forms

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

3. Update `.env` with your API URL

## Running the Frontend

Development mode:
```bash
npm start
```

Build for production:
```bash
npm run build
```

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── ProtectedRoute.js
│   │   ├── Navbar.js
│   │   └── UI.js
│   ├── context/
│   │   └── AuthContext.js
│   ├── pages/
│   │   ├── Login.js
│   │   ├── Register.js
│   │   ├── Dashboard.js
│   │   ├── Tasks.js
│   │   ├── AdminUsers.js
│   │   ├── AdminActivityLogs.js
│   │   └── AdminAnalytics.js
│   ├── styles/
│   │   ├── App.css
│   │   └── index.css
│   ├── utils/
│   │   └── api.js
│   ├── App.js
│   └── index.js
├── public/
│   └── index.html
├── package.json
└── .env.example
```

## Demo Credentials

Admin Account:
- Email: admin@example.com
- Password: password123

User Account:
- Email: user@example.com
- Password: password123

## Technologies Used

- React 18
- React Router v6
- Axios
- Context API for state management

## Available Pages

### Public Pages
- `/login` - User login
- `/register` - User registration

### Protected Pages
- `/dashboard` - Main dashboard with statistics
- `/tasks` - Task management page

### Admin Pages (Admin only)
- `/admin/users` - User management
- `/admin/activity` - Activity logs
- `/admin/analytics` - Analytics and reports

## UI Components

### Card
Reusable card container for content
```jsx
<Card>Content here</Card>
```

### Button
Customizable button with types
```jsx
<Button type="primary">Click Me</Button>
```

### Input
Form input with styling
```jsx
<Input placeholder="Enter text" value={value} onChange={handler} />
```

### Table
Data table with pagination
```jsx
<Table columns={columns} data={data} />
```

### Alert
Alert messages
```jsx
<Alert message="Success!" type="success" />
```

## Styling

The application uses inline styles with responsive design. CSS files are also available in the styles folder for additional customization.

## Notes

- All API calls require authentication token
- Admin routes are protected and only accessible to admin users
- Token is stored in localStorage
- Automatic logout on token expiration

## Environment Variables

- `REACT_APP_API_URL` - Backend API URL (default: http://localhost:5000/api)
