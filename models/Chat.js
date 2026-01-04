import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
    {
        participants: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true
            }
        ],

        lastMessage: {
            type: String,
            default: ""
        },

        lastMessageSender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: true // createdAt, updatedAt
    }
);

export default mongoose.model("Chat", chatSchema);
