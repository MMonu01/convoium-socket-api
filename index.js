const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
require("dotenv").config();

const { Connection } = require("./config/db.js");

const { ImplimentSocketIo } = require("./socket.js");

const PORT = process.env.PORT || 9001;

const app = express();
const httpServer = createServer(app);

app.use(express.json());

const io = new Server(httpServer, {
  cors: {
    origin: process.env.PROJECT_URL,
    methods: ["GET", "POST"],
  },
});
ImplimentSocketIo(io);

Connection.then(() => {
  console.log("connection to db successfull");
  httpServer.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
  });
}).catch((err) => {
  console.log("failed to connect to db", err);
});
