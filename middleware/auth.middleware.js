import jwt from "jsonwebtoken";
import User from "../models/Users.js";

const authMiddleware = async (req, res, next) => {
    try {
        // 1️⃣ Get token directly
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({
                message: "Authorization token missing"
            });
        }

        // 2️⃣ Verify token
        const decoded = jwt.verify(token.trim(), process.env.JWT_SECRET);

        // 3️⃣ Get user
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({
                message: "User not found"
            });
        }

        // 4️⃣ Attach user
        req.user = user;
        next();
    } catch (error) {
        console.error("Auth error:", error.message);
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};

export default authMiddleware;
