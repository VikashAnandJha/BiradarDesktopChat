const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const conversationSchema = new Schema({
  users: [
    {
      type: String,
      ref: "User",
      required: true,
    },
  ],
  conv_type: {
    type: String,
    enum: ["private", "group"],
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Conversation", conversationSchema);
