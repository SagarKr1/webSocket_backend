import Chat from "../models/Chat.js";

export const getMyChats = async (req, res) => {
    try {
        const userId = req.user._id;

        const chats = await Chat.find({
            participants: userId
        })
            .populate("participants", "name email phone isOnline")
            .sort({ updatedAt: -1 });

        // format response: show only other user
        const formattedChats = chats.map(chat => {
            const otherUser = chat.participants.find(
                user => user._id.toString() !== userId.toString()
            );

            return {
                chatId: chat._id,
                user: otherUser,
                lastMessage: chat.lastMessage,
                lastMessageSender: chat.lastMessageSender,
                updatedAt: chat.updatedAt
            };
        });

        res.json(formattedChats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
