const express = require("express");
const router = express.Router();
const ChatMessage = require("../schema/chatMessageSchema");
const Conversation = require("../schema/conversationSchema");
const User = require("../schema/userSchema");
const mongoose = require("mongoose");
const authenticateToken = require("../middleware/authMiddleware");

// Route to add a chat message
router.post("/addMessage", authenticateToken, async (req, res) => {
  const { to_user, message, msg_id } = req.body;
  const from_user = req.user.userId;

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

router.get("/getAllConv", authenticateToken, async (req, res) => {
  const { userId } = req.user;

  try {
    // Find all conversations where the user is a participant
    const conversations = await Conversation.find({ users: userId });

    // Prepare an array to hold the conversation details
    const convDetails = await Promise.all(
      conversations.map(async (conv) => {
        // Find the last message in this conversation
        const lastMessage = await ChatMessage.findOne({
          conv_id: conv._id,
        }).sort({ created_at: -1 });

        if (lastMessage == null) return;

        // Get the target user (the other participant)
        const targetUserId = conv.users.find((id) => id !== userId);
        console.log({ targetUserId });
        if (targetUserId != null) {
          const targetUser = await User.findById(targetUserId);
          if (targetUser != null)
            return {
              conv_id: conv._id,
              target_user: targetUser,
              last_message: lastMessage.message,
              last_message_sender:
                lastMessage.from_user === userId ? "me" : "other",
            };
        }
      })
    );
    convDetails1 = convDetails.filter((conv) => conv != null);

    res.status(200).json({ success: true, conversations: convDetails1 });
  } catch (err) {
    console.error({ err });
    res.status(500).json({ error: "Internal server error" });
  }
});
// Route to get or create a conversation
router.get("/getConv", authenticateToken, async (req, res) => {
  const { target_user_id } = req.query;
  const user_id = req.user.userId;
  console.log(req.user);

  if (!user_id || !target_user_id) {
    return res.status(400).json({ error: "Missing user ID or target user ID" });
  }

  try {
    let conversation = await Conversation.findOne({
      users: { $all: [user_id, target_user_id] },
      conv_type: "private",
    });

    if (!conversation) {
      conversation = new Conversation({
        users: [user_id, target_user_id],
        conv_type: "private",
      });
      await conversation.save();
    }

    const targetUser = await User.findById(target_user_id);
    if (!targetUser) {
      return res.status(404).json({ error: "Target user not found" });
    }

    const messages = await ChatMessage.find({ conv_id: conversation._id })
      .sort({ created_at: -1 })
      .limit(10); // Adjust the limit as needed

    res.status(200).json({
      success: true,
      conversation_id: conversation._id,
      target_user: {
        id: targetUser._id,
        name: targetUser.name,
        email: targetUser.email,
        // Add other fields as needed
      },
      recent_messages: messages,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
