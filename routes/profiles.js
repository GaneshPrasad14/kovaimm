const express = require('express');
const router = express.Router();
const { authenticateAdmin } = require('../middleware/auth');
const upload = require('../middleware/upload');
const {
  getProfiles,
  getProfile,
  createProfile,
  updateProfile,
  deleteProfile,
  searchProfiles
} = require('../controllers/profileController');

// Public routes - anyone can view profiles
router.get('/:type', getProfiles); // Get all brides or grooms
router.get('/profile/:id', getProfile); // Get single profile
router.get('/search/:type', searchProfiles); // Search profiles

// Admin only routes - require authentication
router.post('/', authenticateAdmin, upload.fields([{ name: 'image', maxCount: 1 }, { name: 'horoscopeImage', maxCount: 1 }]), createProfile); // Create new profile
router.put('/:id', authenticateAdmin, upload.fields([{ name: 'image', maxCount: 1 }, { name: 'horoscopeImage', maxCount: 1 }]), updateProfile); // Update profile
router.delete('/:id', authenticateAdmin, deleteProfile); // Delete profile

module.exports = router;
