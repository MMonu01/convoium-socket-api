const mongoose = require("mongoose");

function ChangeDateFormat() {
  let date_string = new Date();
  let day = date_string.getDate();
  let month = date_string.getMonth() + 1;
  let year = date_string.getFullYear();
  let hours = date_string.getHours();
  let minutes = date_string.getMinutes();
  console.log(day + "/" + month + "/" + year + " " + hours + ":" + minutes);

  let new_format = `${day}/${month}/${year} ${hours}:${minutes}`;
  console.log("new date", new_format);
  return new_format;
}

const messageSchema = new mongoose.Schema({
  date: { type: String, default: ChangeDateFormat() },
  room_id: { type: String, required: true },
  message: { type: String, required: true },
  user_email: { type: String, required: true },
  user_avatar: { type: String, required: true },
  username: { type: String, required: true },
});

const messageModel = mongoose.model("message", messageSchema);

module.exports = { messageModel };
