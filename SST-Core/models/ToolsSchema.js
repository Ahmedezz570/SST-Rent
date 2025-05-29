const mongoose = require('mongoose');

const toolSchema = new mongoose.Schema({
  toolId: String,
  name: String,
  category: String,
  description: String,
  image: String,
  status: {
    type: String,
    enum: ['Available', 'In Use', 'Maintenance'], 
    default: 'Available'
  },
  quantity: {
    type: Number,
    default: 1
  },
});

module.exports = mongoose.model('Tool', toolSchema);
