
const mongoose = require('mongoose');

const toolSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  specification: {
    type: String,
    default: '',
  },
  quantity: {
    type: Number,
    default: 0,
  },
  available: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ['Available', 'In Use', 'Maintenance'],
    default: 'Available'
  },
  category: {
    type: String, // زى Control, PCB, Structure
    required: true
  },
  image: {
    type: String,
    default: '',
  },
});

module.exports = mongoose.model('Toolll', toolSchema);
