"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserChats = exports.createChat = void 0;
const Chat_1 = require("../../models/Chat"); // Adjust the path accordingly
const createChat = async (req, res) => {
    try {
        const { sender, receiver, receiver_model_type, sender_model_type, content, } = req.body;
        // Create a new chat message
        const chatMessage = new Chat_1.Chat({
            sender,
            receiver,
            sender_model_type,
            receiver_model_type,
            content,
        });
        await chatMessage.save();
        res.status(201).json(chatMessage);
        return;
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
        return;
    }
};
exports.createChat = createChat;
const getUserChats = async (req, res) => {
    try {
        const { userId, otherUserId } = req.params;
        // Find all chat messages where the user is either sender or receiver
        const chats = await Chat_1.Chat.find({
            $or: [
                { sender: userId, receiver: otherUserId },
                { sender: otherUserId, receiver: userId },
            ],
        }).sort({ timestamp: 1 });
        // .populate("sender")
        // .populate("receiver")
        // .exec();
        res.status(200).json(chats);
        return;
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
        return;
    }
};
exports.getUserChats = getUserChats;
//# sourceMappingURL=chats.js.map