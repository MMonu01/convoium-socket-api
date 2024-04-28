require("dotenv").config();

const { userModel } = require("./model/user-model.js");
const { messageModel } = require("./model/message-model.js");

let user_list = {};

function ImplimentSocketIo(io) {
  io.on("connection", (socket) => {
    socket.on("join", async ({ room_id, username, user_id, avatar }) => {
      socket.join(room_id);
      SendSocketList({ room: room_id, io, event: "join", username, user_id, avatar });
    });

    socket.on("disconnect", () => {
      SendSocketList({ io, room: null, event: "disconnect" });
    });

    socket.on("newMessage", async ({ message: new_message, room_id, user_id }) => {
      const user_details = await userModel.findOne({ _id: user_id });

      const user_email = user_details.email;
      const user_avatar = user_details.avatar;
      const username = user_details.username;

      const newMessage = new messageModel({ message: new_message, room_id, user_email, user_avatar, username });
      await newMessage.save();

      io.to(room_id).emit("newMessage", newMessage);
    });
  });
}

const SendSocketList = async ({ io, room, event, username, avatar, user_id }) => {
  const socket_connected = await io.in(room).fetchSockets();

  if (event === "join") {
    let id = socket_connected[socket_connected.length - 1].id;
    user_list[id] = { user_id, username, avatar, room };
    console.log("user joined", user_list[id].username);
  } else {
    let all_socket = await io.fetchSockets();
    let temp_obj = {};
    for (let i = 0; i < all_socket.length; i++) {
      temp_obj[all_socket[i].id] = 1;
    }

    for (let key in user_list) {
      if (!Object.hasOwn(temp_obj, key)) {
        room = user_list[key].room;
        console.log("user disconnected", user_list[key].username);

        delete user_list[key];
        break;
      }
    }
  }

  let socket_list = [];

  for (let key in user_list) {
    if (user_list[key].room === room) {
      socket_list.push(user_list[key]);
    }
  }

  io.to(room).emit("online", socket_list);
};

module.exports = { ImplimentSocketIo };
