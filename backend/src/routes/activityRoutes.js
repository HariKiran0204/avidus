const express = require('express');
const {
  getActivityLogs,
  getUserActivityLogs,
  getActivityStats
} = require('../controllers/activityController');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

// All activity routes are protected
router.use(protect);

// Admin routes
router.get('/', adminOnly, getActivityLogs);
router.get('/stats/overview', adminOnly, getActivityStats);

// User routes
router.get('/user/:userId', getUserActivityLogs);

module.exports = router;
