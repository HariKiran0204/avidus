const express = require('express');
const {
  getAllUsers,
  getUserById,
  updateUserStatus,
  deleteUser,
  updateUserProfile,
  getUserStats
} = require('../controllers/userController');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

// All user routes are protected
router.use(protect);

// Admin routes
router.get('/', adminOnly, getAllUsers);
router.get('/stats/overview', adminOnly, getUserStats);
router.put('/:id/status', adminOnly, updateUserStatus);
router.delete('/:id', adminOnly, deleteUser);

// User routes
router.get('/:id', getUserById);
router.put('/:id/profile', updateUserProfile);

module.exports = router;
