const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatMessageSchema = new Schema({
  conv_id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  msg_id: {
    type: String,
    required: true,
  },
  from_user: {
    type: String,
    ref: "User",
    required: true,
  },
  to_user: {
    type: String,
    ref: "User",
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("ChatMessage", chatMessageSchema);
