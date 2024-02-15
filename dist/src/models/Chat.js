"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chat = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const chatMessageSchema = new mongoose_1.default.Schema({
    sender: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        refPath: "sender_model_type",
        required: true,
        index: true,
    },
    receiver: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
exports.Chat = mongoose_1.default.model("Chat", chatMessageSchema);
//# sourceMappingURL=Chat.js.map