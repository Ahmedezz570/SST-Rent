const mongoose = require("mongoose");
const requestSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  toolId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tool",
    required: true
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  reason : {
    type: String,
    required: true
  },
  expectedReturnDate: { type: Date, required: true },
});
module.exports = mongoose.model("Request", requestSchema);