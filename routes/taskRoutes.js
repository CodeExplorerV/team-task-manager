const express = require('express');
const Task = require('../models/Task');
const Project = require('../models/Project');
const { protect, admin } = require('../middleware/auth');
const router = express.Router();

// Create Task (Admin only)
router.post('/', protect, admin, async (req, res) => {
  const { title, description, project, assignedTo, dueDate } = req.body;
  try {
    const task = await Task.create({
      title,
      description,
      project,
      assignedTo,
      dueDate,
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get tasks for a specific project
router.get('/project/:projectId', protect, async (req, res) => {
  try {
    const tasks = await Task.find({ project: req.params.projectId }).populate('assignedTo', 'name email');
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update task status
router.put('/:id', protect, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    task.status = req.body.status || task.status;
    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get dashboard stats
router.get('/stats', protect, async (req, res) => {
    try {
        const userId = req.user._id;
        const tasks = await Task.find({ assignedTo: userId });
        
        const stats = {
            total: tasks.length,
            todo: tasks.filter(t => t.status === 'To Do').length,
            inProgress: tasks.filter(t => t.status === 'In Progress').length,
            completed: tasks.filter(t => t.status === 'Completed').length,
            overdue: tasks.filter(t => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== 'Completed').length
        };
        
        res.json(stats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
