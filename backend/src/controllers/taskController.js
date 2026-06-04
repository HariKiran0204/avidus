const Task = require('../models/Task');
const { createActivityLog } = require('../middleware/activityLogger');

// @route   POST /api/tasks
// @desc    Create a new task
// @access  Private
exports.createTask = async (req, res) => {
  try {
    const { title, description, assignedTo, priority, dueDate } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a task title'
      });
    }

    const taskData = {
      title,
      description: description || '',
      createdBy: req.user._id,
      priority: priority || 'Medium',
      dueDate: dueDate || null
    };

    // Only admin can assign tasks to others
    if (assignedTo && req.user.role === 'Admin') {
      taskData.assignedTo = assignedTo;
    }

    const task = await Task.create(taskData);

    // Log activity
    await createActivityLog(req.user._id, 'CREATE_TASK', 'New task created', {
      taskId: task._id,
      details: { title, priority }
    });

    // Populate references
    await task.populate('createdBy', 'name email');
    await task.populate('assignedTo', 'name email');

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      task
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @route   GET /api/tasks
// @desc    Get all tasks (Admin sees all, Users see their own)
// @access  Private
exports.getTasks = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;
    const status = req.query.status || null;
    const priority = req.query.priority || null;

    let query = {};

    // Filter based on user role
    if (req.user.role !== 'Admin') {
      query.$or = [
        { createdBy: req.user._id },
        { assignedTo: req.user._id }
      ];
    }

    // Apply additional filters
    if (status) query.status = status;
    if (priority) query.priority = priority;

    const tasks = await Task.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Task.countDocuments(query);

    res.status(200).json({
      success: true,
      count: tasks.length,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page,
      tasks
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @route   GET /api/tasks/:id
// @desc    Get task by ID
// @access  Private
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    // Check authorization
    if (req.user.role !== 'Admin' && 
        task.createdBy.toString() !== req.user._id.toString() &&
        task.assignedTo?.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this task'
      });
    }

    res.status(200).json({
      success: true,
      task
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @route   PUT /api/tasks/:id
// @desc    Update task
// @access  Private
exports.updateTask = async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    // Check authorization
    if (req.user.role !== 'Admin' && task.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this task'
      });
    }

    const { title, description, status, priority, dueDate, assignedTo } = req.body;

    if (title) task.title = title;
    if (description !== undefined) task.description = description;
    if (status) task.status = status;
    if (priority) task.priority = priority;
    if (dueDate) task.dueDate = dueDate;
    if (assignedTo && req.user.role === 'Admin') task.assignedTo = assignedTo;

    task = await task.save();

    // Log activity
    await createActivityLog(req.user._id, 'UPDATE_TASK', 'Task updated', {
      taskId: task._id,
      details: { title: task.title, status: task.status }
    });

    await task.populate('createdBy', 'name email').populate('assignedTo', 'name email');

    res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      task
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @route   DELETE /api/tasks/:id
// @desc    Delete task
// @access  Private
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    // Check authorization
    if (req.user.role !== 'Admin' && task.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this task'
      });
    }

    await Task.findByIdAndDelete(req.params.id);

    // Log activity
    await createActivityLog(req.user._id, 'DELETE_TASK', 'Task deleted', {
      taskId: req.params.id,
      details: { title: task.title }
    });

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @route   GET /api/tasks/stats/overview
// @desc    Get task statistics
// @access  Private
exports.getTaskStats = async (req, res) => {
  try {
    let query = {};

    // Filter based on user role
    if (req.user.role !== 'Admin') {
      query.$or = [
        { createdBy: req.user._id },
        { assignedTo: req.user._id }
      ];
    }

    const totalTasks = await Task.countDocuments(query);
    const completedTasks = await Task.countDocuments({ ...query, status: 'Completed' });
    const pendingTasks = await Task.countDocuments({ ...query, status: 'Pending' });
    const inProgressTasks = await Task.countDocuments({ ...query, status: 'In Progress' });

    res.status(200).json({
      success: true,
      stats: {
        totalTasks,
        completedTasks,
        pendingTasks,
        inProgressTasks
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
