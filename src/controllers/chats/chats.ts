import { Request, Response } from "express";
import { Chat } from "../../models/Chat"; // Adjust the path accordingly

export const createChat = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      sender,
      receiver,
      receiver_model_type,
      sender_model_type,
      content,
    } = req.body;

    // Create a new chat message
    const chatMessage = new Chat({
      sender,
      receiver,
      sender_model_type,
      receiver_model_type,
      content,
    });

    await chatMessage.save();

    res.status(201).json(chatMessage);
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
    return;
  }
};

export const getUserChats = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId, otherUserId } = req.params;

    // Find all chat messages where the user is either sender or receiver
    const chats = await Chat.find({
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
    return;
  }
};
