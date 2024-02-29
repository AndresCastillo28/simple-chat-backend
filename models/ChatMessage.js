const mongoose = require("mongoose");

const ChatMessageSchema = new mongoose.Schema({
  message: String,
  name: String,
  date: { type: Date, default: Date.now } 
});

module.exports = mongoose.model("ChatMessage", ChatMessageSchema);
