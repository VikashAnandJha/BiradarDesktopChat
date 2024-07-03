const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { Server } = require("socket.io");
const http = require("http");
const chatRoutes = require("./routes/chatRoute");
const dotenv = require("dotenv");
const cors = require("cors"); // Import cors package
const jwt = require("jsonwebtoken");
const User = require("./schema/userSchema"); // Import user schema

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(cors()); // Enable CORS for all routes

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins for simplicity; adjust for production
    methods: ["GET", "POST"],
  },
});

// Connect to your MongoDB database using the connection string from .env
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to the database");
});

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/chat", chatRoutes);

// Authentication route
app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide email and password" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Socket.io event handlers
io.on("connection", (socket) => {
  console.log("New client connected: ", socket.id);

  // Listen for send_message event from the client
  socket.on("send_message", async (message) => {
    console.log("Message received: ", message);
    io.emit("receive_message", message);
    // Call the route to save the message
    try {
      const response = await fetch("http://localhost:4000/chat/addMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });

      const result = await response.json();
      if (result.success) {
        // Broadcast the message to all connected clients
        // io.emit('receive_message', message);
      } else {
        console.error("Error saving message:", result.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });

  // Handle client disconnection
  socket.on("disconnect", () => {
    console.log("Client disconnected: ", socket.id);
  });
});

// Start the server
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});

io.listen(3009, () => {
  console.log("Socket.io server listening on port 3009");
});
