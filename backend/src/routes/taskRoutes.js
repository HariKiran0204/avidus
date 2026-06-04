const express = require('express');
const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getTaskStats
} = require('../controllers/taskController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// All task routes are protected
router.use(protect);

router.post('/', createTask);
router.get('/', getTasks);
router.get('/stats/overview', getTaskStats);
router.get('/:id', getTaskById);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router;
