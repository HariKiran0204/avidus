# 🚀 Quick Reference Guide

## Starting the Application

### Terminal 1 - Backend
```bash
cd backend
npm install      # First time only
npm run dev
```

### Terminal 2 - Frontend (After backend is running)
```bash
cd frontend
npm install      # First time only
npm start
```

## Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@example.com | password123 |
| User | user@example.com | password123 |

## Important URLs

| Component | URL |
|-----------|-----|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:5000 |
| API Health | http://localhost:5000/api/health |

## File Locations

### Backend
- Config: `backend/src/config/`
- Models: `backend/src/models/`
- Controllers: `backend/src/controllers/`
- Routes: `backend/src/routes/`
- Middleware: `backend/src/middleware/`
- Main: `backend/src/server.js`

### Frontend
- Pages: `frontend/src/pages/`
- Components: `frontend/src/components/`
- Context: `frontend/src/context/`
- Utilities: `frontend/src/utils/`
- Styles: `frontend/src/styles/`
- Main: `frontend/src/App.js`

## Common Commands

### Backend
```bash
npm run dev          # Start with auto-reload
npm start            # Start production server
npm test             # Run tests
node seed.js         # Populate database with demo data
```

### Frontend
```bash
npm start            # Start development server
npm run build        # Build for production
npm test             # Run tests
npm run eject        # Eject from create-react-app (irreversible!)
```

### Git
```bash
git status           # Check status
git add .            # Stage changes
git commit -m "msg"  # Commit changes
git push             # Push to remote
git log              # View commit history
```

## Key Features Checklist

- ✅ User Authentication (JWT)
- ✅ Role-Based Access Control
- ✅ Task Management
- ✅ Activity Logging
- ✅ Admin Dashboard
- ✅ User Management
- ✅ Analytics
- ✅ Responsive Design

## Testing Workflow

1. **Frontend Testing**
   - Login as admin: admin@example.com / password123
   - Navigate to `/admin/users` to see user management
   - Navigate to `/admin/activity` to see activity logs
   - Navigate to `/admin/analytics` to see analytics

2. **Backend Testing (Postman)**
   - Login to get token
   - Use token in Authorization header
   - Test various endpoints

3. **Database Testing**
   - Use MongoDB Compass to view data
   - Check collections: users, tasks, activitylogs

## Deployment Checklist

- [ ] Update JWT_SECRET in production
- [ ] Change MongoDB URI to production database
- [ ] Set NODE_ENV=production
- [ ] Configure CORS for production domain
- [ ] Enable HTTPS
- [ ] Set up logging and monitoring
- [ ] Configure rate limiting
- [ ] Update API_URL in frontend for production
- [ ] Build frontend for production
- [ ] Deploy backend to cloud service
- [ ] Deploy frontend to CDN/hosting service

## Environment Variables

### Backend (.env)
```
MONGODB_URI=mongodb://localhost:27017/avidus
JWT_SECRET=your_secret_key
PORT=5000
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:3000
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

## API Response Format

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "errors": [ ... ]
}
```

## Role Permissions Matrix

| Action | User | Admin |
|--------|------|-------|
| Create Task | ✅ Own | ✅ All |
| View Tasks | ✅ Own | ✅ All |
| Update Task | ✅ Own | ✅ All |
| Delete Task | ✅ Own | ✅ All |
| View Users | ❌ | ✅ |
| Manage Users | ❌ | ✅ |
| View Activity Logs | ✅ Own | ✅ All |
| View Analytics | ❌ | ✅ |

## Performance Tips

1. **Database Indexing**: Already configured on userId and createdAt
2. **Pagination**: Implemented on all list endpoints
3. **Lazy Loading**: Frontend components load on demand
4. **Caching**: Token cached in localStorage

## Security Best Practices

- ✅ Passwords hashed with bcryptjs
- ✅ JWT tokens for authentication
- ✅ CORS configured
- ✅ Input validation on backend
- ✅ Role-based access control
- ✅ Activity logging for audit trail
- ✅ Inactive users blocked

## Troubleshooting Quick Links

**MongoDB Issues?**
- Ensure MongoDB is running: `mongod` or check services
- Verify connection string matches your setup

**Can't connect to backend?**
- Check backend is running on port 5000
- Verify CORS settings

**Frontend shows blank?**
- Check browser console for errors
- Verify REACT_APP_API_URL is correct
- Check if backend is running

**Token issues?**
- Clear localStorage and login again
- Check JWT_SECRET is consistent
- Verify token isn't expired

## Next Steps

1. ✅ Clone/Download repository
2. ✅ Install dependencies
3. ✅ Configure environment variables
4. ✅ Start backend and frontend
5. ✅ Test with demo credentials
6. ✅ Explore all features
7. ⭐ Customize for your needs
8. 🚀 Deploy to production

---

**For detailed setup instructions, see [SETUP_GUIDE.md](SETUP_GUIDE.md)**
