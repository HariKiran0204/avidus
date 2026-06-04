# GitHub Copilot Instructions

## Project Overview
This is a full-stack MERN application with role-based access control (RBAC) and activity logging for task management.

## Technology Stack
- **Backend**: Node.js, Express.js, MongoDB, JWT
- **Frontend**: React 18, React Router, Axios
- **Database**: MongoDB

## Key Features
1. User Authentication with JWT
2. Role-Based Access Control (Admin, User)
3. Task Management System
4. Activity Logging and Audit Trail
5. Admin Dashboard with Analytics
6. Responsive UI

## Project Structure
- `/backend` - Node.js/Express server
- `/frontend` - React.js client application
- `/README.md` - Main project documentation

## Getting Started

### Backend
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

### Frontend
```bash
cd frontend
npm install
cp .env.example .env
npm start
```

## Important Notes
- Backend runs on http://localhost:5000
- Frontend runs on http://localhost:3000
- MongoDB must be running (local or Atlas)
- JWT secret should be changed in production

## Git Workflow
1. Create feature branch: `git checkout -b feature/feature-name`
2. Make changes and commit: `git commit -am "description"`
3. Push to branch: `git push origin feature/feature-name`
4. Create Pull Request on GitHub

## Common Commands

### Backend
- `npm run dev` - Start with auto-reload
- `npm start` - Start production server
- `node seed.js` - Seed database with sample data

### Frontend
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests

## API Documentation
See `/backend/README.md` for complete API endpoint documentation.

## Database Credentials (Local Development)
- MongoDB URI: `mongodb://localhost:27017/avidus`

## Demo Accounts
- Admin: admin@example.com / password123
- User: user@example.com / password123

## File Organization Rules
- Backend controllers in `/src/controllers`
- Backend routes in `/src/routes`
- Frontend pages in `/src/pages`
- Frontend components in `/src/components`
- Always use meaningful commit messages

## Code Style Guidelines
- Use ES6+ syntax
- Follow MVC pattern for backend
- Use React hooks in functional components
- Keep components reusable and modular
- Document complex logic with comments
