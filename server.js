import dotenv from "dotenv";
import http from "http";
import app from "./app.js";
import connectDB from "./config/db.js";

// 1️⃣ Load environment variables
dotenv.config();

// 2️⃣ Connect MongoDB
connectDB();

// 3️⃣ Create HTTP server (important for Socket.IO later)
const server = http.createServer(app);

// 4️⃣ Get PORT from env
const PORT = process.env.PORT || 5000;

// 5️⃣ Start server
server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
