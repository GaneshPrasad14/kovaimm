const Profile = require('../models/Profile');

// Get all profiles by type (bride/groom)
const getProfiles = async (req, res) => {
  try {
    const { type } = req.params;
    const profiles = await Profile.find({ type }).sort({ createdAt: -1 });
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single profile
const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new profile
const createProfile = async (req, res) => {
  try {
    const profileData = req.body;

    // Handle uploaded images
    if (req.files) {
      if (req.files.image && req.files.image[0]) {
        profileData.image = `/uploads/${req.files.image[0].filename}`;
      }
      if (req.files.horoscopeImage && req.files.horoscopeImage[0]) {
        profileData.horoscopeImage = `/uploads/${req.files.horoscopeImage[0].filename}`;
      }
    }

    // Calculate age from date of birth
    const birthDate = new Date(profileData.dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    profileData.age = age;

    // Set profession to job if not provided
    if (!profileData.profession && profileData.job) {
      profileData.profession = profileData.job;
    }

    const profile = new Profile(profileData);
    const savedProfile = await profile.save();
    res.status(201).json(savedProfile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update profile
const updateProfile = async (req, res) => {
  try {
    const updateData = { ...req.body };

    // Handle uploaded images
    if (req.files) {
      if (req.files.image && req.files.image[0]) {
        updateData.image = `/uploads/${req.files.image[0].filename}`;
      }
      if (req.files.horoscopeImage && req.files.horoscopeImage[0]) {
        updateData.horoscopeImage = `/uploads/${req.files.horoscopeImage[0].filename}`;
      }
    }

    // Recalculate age if date of birth is being updated
    if (updateData.dateOfBirth) {
      const birthDate = new Date(updateData.dateOfBirth);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      updateData.age = age;
    }

    // Update profession if job is provided
    if (updateData.job && !updateData.profession) {
      updateData.profession = updateData.job;
    }

    const profile = await Profile.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json(profile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete profile
const deleteProfile = async (req, res) => {
  try {
    const profile = await Profile.findByIdAndDelete(req.params.id);
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json({ message: 'Profile deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search profiles
const searchProfiles = async (req, res) => {
  try {
    const { type, query, ageMin, ageMax, location } = req.query;
    let filter = { type };

    if (query) {
      filter.$or = [
        { name: { $regex: query, $options: 'i' } },
        { profession: { $regex: query, $options: 'i' } },
        { company: { $regex: query, $options: 'i' } }
      ];
    }

    if (ageMin || ageMax) {
      filter.age = {};
      if (ageMin) filter.age.$gte = parseInt(ageMin);
      if (ageMax) filter.age.$lte = parseInt(ageMax);
    }

    if (location) {
      filter.location = { $regex: location, $options: 'i' };
    }

    const profiles = await Profile.find(filter).sort({ createdAt: -1 });
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProfiles,
  getProfile,
  createProfile,
  updateProfile,
  deleteProfile,
  searchProfiles
};
