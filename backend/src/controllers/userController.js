const User = require('../models/User');
const Task = require('../models/Task');
const ActivityLog = require('../models/ActivityLog');
const { createActivityLog } = require('../middleware/activityLogger');

// @route   GET /api/users
// @desc    Get all users (Admin only)
// @access  Private/Admin
exports.getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    const users = await User.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await User.countDocuments();

    // Log activity
    await createActivityLog(req.user._id, 'VIEW_ALL_USERS', 'Admin viewed all users', {
      ipAddress: req.ip
    });

    res.status(200).json({
      success: true,
      count: users.length,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page,
      users: users.map(user => user.getPublicProfile())
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @route   GET /api/users/:id
// @desc    Get user by ID
// @access  Private
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Users can only view their own profile unless they are admin
    if (req.user.role !== 'Admin' && req.user._id.toString() !== req.params.id) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to view this user profile'
      });
    }

    res.status(200).json({
      success: true,
      user: user.getPublicProfile()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @route   PUT /api/users/:id/status
// @desc    Update user status (Admin only)
// @access  Private/Admin
exports.updateUserStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!['Active', 'Inactive'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Status must be either Active or Inactive'
      });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Log activity
    await createActivityLog(req.user._id, 'UPDATE_USER_STATUS', 
      `User status updated to ${status}`, {
      targetUserId: req.params.id,
      details: { status }
    });

    res.status(200).json({
      success: true,
      message: 'User status updated successfully',
      user: user.getPublicProfile()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @route   DELETE /api/users/:id
// @desc    Delete user (Admin only)
// @access  Private/Admin
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Delete all tasks created by user
    await Task.deleteMany({ createdBy: req.params.id });

    // Log activity
    await createActivityLog(req.user._id, 'DELETE_USER', 
      `User ${user.email} deleted`, {
      targetUserId: req.params.id,
      details: { deletedUserEmail: user.email }
    });

    res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @route   PUT /api/users/:id/profile
// @desc    Update user profile
// @access  Private
exports.updateUserProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

    // Users can only update their own profile unless they are admin
    if (req.user.role !== 'Admin' && req.user._id.toString() !== req.params.id) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to update this profile'
      });
    }

    const updateData = {};
    if (name) updateData.name = name;
    if (email) {
      const existingUser = await User.findOne({ email, _id: { $ne: req.params.id } });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'Email already in use'
        });
      }
      updateData.email = email;
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    // Log activity
    await createActivityLog(req.user._id, 'PROFILE_UPDATE', 'User profile updated', {
      details: updateData
    });

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user: user.getPublicProfile()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @route   GET /api/users/stats/overview
// @desc    Get user statistics (Admin only)
// @access  Private/Admin
exports.getUserStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ status: 'Active' });
    const inactiveUsers = await User.countDocuments({ status: 'Inactive' });
    const adminUsers = await User.countDocuments({ role: 'Admin' });
    const regularUsers = await User.countDocuments({ role: 'User' });

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        activeUsers,
        inactiveUsers,
        adminUsers,
        regularUsers
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
