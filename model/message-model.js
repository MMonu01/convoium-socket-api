const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  date: { type: Date, default: new Date() },
  room_id: { type: String, required: true },
  message: { type: String, required: true },
  user_email: { type: String, required: true },
  user_avatar: { type: String, required: true },
  username: { type: String, required: true },
});

const messageModel = mongoose.model("message", messageSchema);

module.exports = { messageModel };
