import { WebSocketServer } from "ws";
import socketAuth from "../middleware/socketAuth.middleware.js";
import socketRoutes from "../routes/chat.routes.js";
import { socketStore } from "../store/socketStore.js";
import User from "../models/Users.js";

const initWebSocket = (server) => {
    const wss = new WebSocketServer({ server });

    wss.on("connection", async (ws, req) => {
        const user = await socketAuth(ws, req);
        if (!user) return;

        console.log("🟢 WS connected:", ws.userId);

        ws.on("message", async (data) => {
            const parsed = JSON.parse(data.toString());
            await socketRoutes(ws, parsed);
        });

        ws.on("close", async () => {
            socketStore.delete(ws.userId);

            // ✅ DB offline update
            await User.findByIdAndUpdate(ws.userId, {
                isOnline: false,
                lastSeen: new Date()
            });

            console.log("🔴 WS disconnected:", ws.userId);
        });
    });
};

export default initWebSocket;
