const socketIo = require("socket.io");
const ChatMessage = require("../models/ChatMessage");


function initSocket(server) {
  const io = require("socket.io")(server, {
    cors: {
      origin: "https://simple-chat-bice.vercel.app", 
      methods: ["GET", "POST"], 
    }
  });
  

  io.on("connection", (socket) => {
    console.log("User connected.");
    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
    socket.on("some_event", (data) => {
      const newMessage = new ChatMessage({
        message: data.message,
        name: data.name,
      });


      newMessage
        .save()
        .then((savedMessage) => {
          return ChatMessage.findById(savedMessage._id);
        })
        .then((populatedMessage) => {
          io.emit("message_saved", populatedMessage);
        })
        .catch((error) => {
          console.error("Error saving or populating message:", error);
        });
    });
  });

  return io;
}

module.exports = initSocket;
