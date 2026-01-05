import dotenv from "dotenv";
import http from "http";
import app from "./app.js";
import initWebSocket from "./config/websocket.js";
import connectDB from "./config/db.js";

dotenv.config();
const PORT = process.env.PORT || 5000;

connectDB();



const server = http.createServer(app);
initWebSocket(server);

server.listen(PORT, () => {
    console.log("🚀 Server + WebSocket running");
});
