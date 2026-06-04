const mongoose = require('mongoose');

const activityLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    action: {
      type: String,
      enum: [
        'LOGIN',
        'LOGOUT',
        'CREATE_TASK',
        'UPDATE_TASK',
        'DELETE_TASK',
        'CREATE_USER',
        'UPDATE_USER',
        'DELETE_USER',
        'UPDATE_USER_STATUS',
        'VIEW_ALL_USERS',
        'VIEW_ALL_TASKS',
        'PASSWORD_CHANGE',
        'PROFILE_UPDATE',
        'OTHER'
      ],
      required: true
    },
    description: {
      type: String,
      default: ''
    },
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task',
      default: null
    },
    targetUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null
    },
    ipAddress: {
      type: String,
      default: null
    },
    userAgent: {
      type: String,
      default: null
    },
    statusCode: {
      type: Number,
      default: 200
    },
    details: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    },
    createdAt: {
      type: Date,
      default: Date.now,
      index: true
    }
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

// Create index for efficient querying
activityLogSchema.index({ userId: 1, createdAt: -1 });
activityLogSchema.index({ action: 1, createdAt: -1 });

module.exports = mongoose.model('ActivityLog', activityLogSchema);
