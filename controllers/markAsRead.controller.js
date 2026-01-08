import Message from '../models/Message.js';

export const markMessagesSeen = async (req, res) => {
    try {
        const { chatId } = req.params;
        const userId = req.user._id;

        await Message.updateMany(
            {
                chatId,
                senderId: { $ne: userId },
                seen: false
            },
            { $set: { seen: true } }
        );

        res.json({ message: "Messages marked as seen" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
