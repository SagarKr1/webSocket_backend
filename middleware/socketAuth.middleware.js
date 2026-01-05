import jwt from "jsonwebtoken";
import User from "../models/Users.js";
import { socketStore } from "../store/socketStore.js";

const socketAuth = async (ws, req) => {
    try {
        const url = new URL(req.url, `http://${req.headers.host}`);
        const token = url.searchParams.get("token");

        if (!token) {
            ws.close();
            return null;
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);

        if (!user) {
            ws.close();
            return null;
        }

        ws.userId = user._id.toString();

        // ✅ store socket (transport only)
        socketStore.set(ws.userId, ws);

        // ✅ DB is source of truth
        await User.findByIdAndUpdate(ws.userId, {
            isOnline: true
        });

        return user;
    } catch (error) {
        ws.close();
        return null;
    }
};

export default socketAuth;
