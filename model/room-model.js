const mongoose = require("mongoose");

const joinRoomSchema = new mongoose.Schema({
  date: { type: Date, default: new Date() },
  room_id: { type: String, required: true },
  user_email: { type: String, required: true },
  room_name: { type: String, required: true },
  preview: { type: String, required: true },
});

const joinRoomModel = mongoose.model("join_room", joinRoomSchema);

module.exports = { joinRoomModel };
