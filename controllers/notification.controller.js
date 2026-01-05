import User from "../models/Users.js";
import { socketStore } from "../store/socketStore.js";

export const sendNotification = async (payload) => {
    const { toUserId, message } = payload;

    const user = await User.findById(toUserId);

    if (user?.isOnline) {
        const socket = socketStore.get(toUserId);

        if (socket) {
            socket.send(JSON.stringify({
                event: "NOTIFICATION",
                payload: { message }
            }));
        }
    }
};
