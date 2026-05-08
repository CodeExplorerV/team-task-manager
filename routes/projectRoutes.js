const express = require('express');
const Project = require('../models/Project');
const { protect, admin } = require('../middleware/auth');
const router = express.Router();

// Create Project (Admin only)
router.post('/', protect, admin, async (req, res) => {
  const { name, description, members } = req.body;
  try {
    const project = await Project.create({
      name,
      description,
      admin: req.user._id,
      members,
    });
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all projects for logged in user
router.get('/', protect, async (req, res) => {
  try {
    const projects = await Project.find({
      $or: [{ admin: req.user._id }, { members: req.user._id }],
    }).populate('admin members', 'name email');
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
