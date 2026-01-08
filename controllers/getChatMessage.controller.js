import Message from "../models/Message.js";

export const getMessagesByChat = async (req, res) => {
    try {
        const { chatId } = req.params;
        const { limit = 20, skip = 0 } = req.query;

        const messages = await Message.find({ chatId })
            .sort({ createdAt: -1 })
            .skip(Number(skip))
            .limit(Number(limit));

        res.json(messages.reverse()); // oldest → newest
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
