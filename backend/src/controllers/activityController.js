const ActivityLog = require('../models/ActivityLog');

// @route   GET /api/activity-logs
// @desc    Get activity logs (Admin only)
// @access  Private/Admin
exports.getActivityLogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;
    const skip = (page - 1) * limit;
    const action = req.query.action || null;
    const userId = req.query.userId || null;
    const startDate = req.query.startDate || null;
    const endDate = req.query.endDate || null;

    let query = {};

    if (action) query.action = action;
    if (userId) query.userId = userId;

    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) {
        query.createdAt.$gte = new Date(startDate);
      }
      if (endDate) {
        query.createdAt.$lte = new Date(endDate);
      }
    }

    const logs = await ActivityLog.find(query)
      .populate('userId', 'name email')
      .populate('targetUserId', 'name email')
      .populate('taskId', 'title')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await ActivityLog.countDocuments(query);

    res.status(200).json({
      success: true,
      count: logs.length,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page,
      logs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @route   GET /api/activity-logs/user/:userId
// @desc    Get activity logs for a specific user
// @access  Private
exports.getUserActivityLogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;
    const skip = (page - 1) * limit;

    // Users can only view their own logs unless they are admin
    if (req.user.role !== 'Admin' && req.user._id.toString() !== req.params.userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view these logs'
      });
    }

    const logs = await ActivityLog.find({ userId: req.params.userId })
      .populate('userId', 'name email')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await ActivityLog.countDocuments({ userId: req.params.userId });

    res.status(200).json({
      success: true,
      count: logs.length,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page,
      logs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @route   GET /api/activity-logs/stats
// @desc    Get activity statistics (Admin only)
// @access  Private/Admin
exports.getActivityStats = async (req, res) => {
  try {
    const last24Hours = new Date();
    last24Hours.setHours(last24Hours.getHours() - 24);

    const loginCount = await ActivityLog.countDocuments({
      action: 'LOGIN',
      createdAt: { $gte: last24Hours }
    });

    const taskCreationCount = await ActivityLog.countDocuments({
      action: 'CREATE_TASK',
      createdAt: { $gte: last24Hours }
    });

    const taskUpdateCount = await ActivityLog.countDocuments({
      action: 'UPDATE_TASK',
      createdAt: { $gte: last24Hours }
    });

    const taskDeletionCount = await ActivityLog.countDocuments({
      action: 'DELETE_TASK',
      createdAt: { $gte: last24Hours }
    });

    const actionCounts = await ActivityLog.aggregate([
      {
        $group: {
          _id: '$action',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    res.status(200).json({
      success: true,
      stats: {
        last24Hours: {
          logins: loginCount,
          taskCreations: taskCreationCount,
          taskUpdates: taskUpdateCount,
          taskDeletions: taskDeletionCount
        },
        actionBreakdown: actionCounts
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
