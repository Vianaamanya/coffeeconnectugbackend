import mongoose from "mongoose";
const chatMessageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "sender_model_type",
    required: true,
    index: true,
  },

  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "receiver_model_type",
    required: true,
    index: true,
  },

  sender_model_type: {
    type: String,
    enum: ["Farmer", "ESP"],
    required: true,
  },

  receiver_model_type: {
    type: String,
    enum: ["Farmer", "ESP"],
    required: true,
  },

  content: {
    type: String,
    required: true,
  },

  isSender: {
    type: Boolean,
  },

  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export const Chat = mongoose.model("Chat", chatMessageSchema);
