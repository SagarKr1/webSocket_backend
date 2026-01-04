import ChatRequest from "../models/ChatRequest.js";
import Chat from "../models/Chat.js";

export const sendChatRequest = async (req, res) => {
    try {
        const { receiverId } = req.body;

        if (!receiverId) {
            return res.status(400).json({ message: "Receiver required" });
        }

        // prevent duplicate request
        const exists = await ChatRequest.findOne({
            sender: req.user._id,
            receiver: receiverId,
            status: "pending"
        });

        if (exists) {
            return res.status(400).json({ message: "Request already sent" });
        }

        const request = await ChatRequest.create({
            sender: req.user._id,
            receiver: receiverId
        });

        res.status(201).json({
            message: "Chat request sent",
            request
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


export const getReceivedRequests = async (req, res) => {
    try {
        const requests = await ChatRequest.find({
            receiver: req.user._id,
            status: "pending"
        }).populate("sender", "name email");

        res.json(requests);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


export const acceptChatRequest = async (req, res) => {
    try {
        const request = await ChatRequest.findById(req.params.id);

        if (!request) {
            return res.status(404).json({ message: "Request not found" });
        }

        if (request.receiver.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized" });
        }

        request.status = "accepted";
        await request.save();

        // create chat
        const chat = await Chat.create({
            participants: [request.sender, request.receiver]
        });

        res.json({
            message: "Chat request accepted",
            chat
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getSentRequests = async (req, res) => {
    try {
        const requests = await ChatRequest.find({
            sender: req.user._id
        })
            .populate("receiver", "name email phone")
            .sort({ createdAt: -1 });

        res.json(requests);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

