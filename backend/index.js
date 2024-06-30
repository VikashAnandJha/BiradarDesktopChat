const { Server } = require("socket.io");

const io = new Server({
  cors: {
    origin: "*", // Allow all origins for simplicity; adjust for production
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("New client connected: ", socket.id);

  // Listen for send_message event from the client
  socket.on("send_message", (message) => {
    console.log("Message received: ", message);

    // Broadcast the message to all connected clients
    io.emit("receive_message", message);
  });

  // Handle client disconnection
  socket.on("disconnect", () => {
    console.log("Client disconnected: ", socket.id);
  });
});

io.listen(3001, () => {
  console.log("Socket.io server listening on port 3001");
});
