const mongoose = require('mongoose');

const toolHistorySchema = new mongoose.Schema({
  tool: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tool',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  admin :{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  action: {
    type: String,
    enum: ['pending', 'rented', 'returned', 'updated', 'deleted' , 'created'],
    required: true
  }
});

module.exports = mongoose.model('ToolHistory', toolHistorySchema);
