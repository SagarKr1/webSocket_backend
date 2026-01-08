import Message from "../models/Message.js";
import Chat from "../models/Chat.js";
import User from "../models/Users.js";
import { socketStore } from "../store/socketStore.js";

export const sendMessage = async (ws, payload) => {
    const { chatId, text } = payload;

    // 1️⃣ Save message
    const message = await Message.create({
        chatId,
        senderId: ws.userId,
        text
    });

    // 2️⃣ Update chat metadata
    const chat = await Chat.findByIdAndUpdate(
        chatId,
        {
            lastMessage: text,
            lastMessageSender: ws.userId,
            updatedAt: new Date()
        },
        { new: true }
    );

    // 3️⃣ Find receiver
    const receiverId = chat.participants.find(
        id => id.toString() !== ws.userId
    );

    // 4️⃣ Check DB online status
    const receiver = await User.findById(receiverId);

    if (receiver?.isOnline) {
        const receiverSocket = socketStore.get(receiverId.toString());

        if (receiverSocket) {
            receiverSocket.send(JSON.stringify({
                event: "NEW_MESSAGE",
                payload: {
                    chatId,
                    senderId: ws.userId,
                    text,
                    createdAt: message.createdAt
                }
            }));
        }
    }
};

