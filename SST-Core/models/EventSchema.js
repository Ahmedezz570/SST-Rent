const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    required: true
  },
  type: {
    type: String,
    enum: ['competition', 'update', 'workshop', 'announcement'], 
    required: true
  },
  mainImage: {
    type: String,
    required: true
  },
  galleryImages: {
    type: [String],
    default: []
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Event", EventSchema);
