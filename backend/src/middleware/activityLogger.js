const ActivityLog = require('../models/ActivityLog');

// Activity logging middleware
const logActivity = async (action, req, res, next) => {
  try {
    const userId = req.user?._id;
    if (!userId) return;

    const activityData = {
      userId,
      action,
      ipAddress: req.ip || req.connection.remoteAddress,
      userAgent: req.headers['user-agent'] || 'Unknown',
      statusCode: res.statusCode || 200,
      description: `User performed ${action} action`,
      details: {}
    };

    // Add task info if available
    if (req.params.taskId) {
      activityData.taskId = req.params.taskId;
    }

    // Add target user info if available
    if (req.params.userId && req.params.userId !== userId.toString()) {
      activityData.targetUserId = req.params.userId;
    }

    // Add details based on action
    if (req.body && Object.keys(req.body).length > 0) {
      const bodyDetails = { ...req.body };
      delete bodyDetails.password;
      activityData.details = bodyDetails;
    }

    await ActivityLog.create(activityData);
  } catch (error) {
    console.error('Activity logging error:', error);
  }

  next();
};

// Helper function to create activity log entry
const createActivityLog = async (userId, action, description, additionalData = {}) => {
  try {
    const activityData = {
      userId,
      action,
      description,
      ...additionalData
    };
    await ActivityLog.create(activityData);
  } catch (error) {
    console.error('Error creating activity log:', error);
  }
};

module.exports = {
  logActivity,
  createActivityLog
};
