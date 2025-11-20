const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  birthTime: {
    type: String,
    trim: true
  },
  job: {
    type: String,
    trim: true
  },
  company: {
    type: String,
    trim: true
  },
  salary: {
    type: String,
    trim: true
  },
  familyIncome: {
    type: String,
    trim: true
  },
  gender: {
    type: String,
    required: true,
    enum: ['male', 'female']
  },
  horoscope: {
    type: String,
    trim: true
  },
  image: {
    type: String, // Base64 encoded image or URL
  },
  otherDetails: {
    type: String,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['bride', 'groom']
  },
  age: {
    type: Number,
    required: true
  },
  profession: {
    type: String,
    trim: true
  },
  location: {
    type: String,
    default: 'Coimbatore',
    trim: true
  },
  education: {
    type: String,
    default: 'Not specified',
    trim: true
  },
  address: {
    type: String,
    trim: true
  },
  fatherName: {
    type: String,
    trim: true
  },
  motherName: {
    type: String,
    trim: true
  },
  contactNumber: {
    type: String,
    trim: true
  },
  whatsappNumber: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Index for better query performance
profileSchema.index({ type: 1, gender: 1 });
profileSchema.index({ name: 1 });

module.exports = mongoose.model('Profile', profileSchema);