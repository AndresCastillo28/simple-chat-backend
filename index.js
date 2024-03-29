const express = require("express");
const http = require('http');
const { sendResponse } = require("./utils/responseHandler");
const connectDB = require("./config/db");
const cors = require("cors");
require("dotenv").config();

const app = express();
const server = http.createServer(app);

const initSocket = require('./sockets/socketConfig');

const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: 'https://simple-chat-bice.vercel.app',
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true
};

app.use(cors(corsOptions));

connectDB();

app.get("/", (req, res) => {
  sendResponse(res, true, 200, "Api running! Happy hacking...");
});


app.use("/api/messages", require("./routes/messages.route"));


initSocket(server);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;