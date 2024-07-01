const express = require("express");
const router = express.Router();
const ChatMessage = require("../schema/chatMessageSchema");
const Conversation = require("../schema/conversationSchema");
const mongoose = require("mongoose");

// Route to add a chat message
router.post("/addMessage", async (req, res) => {
  const { from_user, to_user, message, msg_id } = req.body;

  if (!from_user || !to_user || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    let conversation = await Conversation.findOne({
      users: { $all: [from_user, to_user] },
      conv_type: "private",
    });

    if (!conversation) {
      conversation = new Conversation({
        users: [from_user, to_user],
        conv_type: "private",
      });
      await conversation.save();
    }

    const newMessage = new ChatMessage({
      conv_id: conversation._id,
      from_user,
      to_user,
      message,
      msg_id,
    });

    await newMessage.save();

    res
      .status(200)
      .json({ success: true, message: "Chat message saved successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to get all chat messages for a conversation
router.get("/getAllChats", async (req, res) => {
  const { conv_id } = req.query;

  if (!conv_id) {
    return res.status(400).json({ error: "Missing conversation ID" });
  }

  try {
    const messages = await ChatMessage.find({ conv_id }).sort({
      created_at: -1,
    });

    res.status(200).json({ success: true, messages });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
