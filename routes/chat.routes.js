import { sendMessage } from "../controllers/message.controller.js";
import { sendNotification } from "../controllers/notification.controller.js";

const socketRoutes = async (ws, data) => {
    const { event, payload } = data;

    switch (event) {
        case "SEND_MESSAGE":
            await sendMessage(ws, payload);
            break;

        case "NOTIFICATION":
            await sendNotification(payload);
            break;

        default:
            break;
    }
};

export default socketRoutes;
