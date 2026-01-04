import express from "express";
import cors from "cors";
import helmet from "helmet";
import userRoutes from "./routes/user.routes.js";

const app = express();

/* Security Headers */
app.use(
    helmet({
        contentSecurityPolicy: false,
        crossOriginEmbedderPolicy: false
    })
);

/* CORS */
app.use(cors({
    origin: "*", // later we will restrict this
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

/* Body Parser */
app.use(express.json());

/* Health Check */
app.get("/", (req, res) => {
    res.send("Chat App Backend Running 🚀");
});

app.use('/api/auth',userRoutes);

export default app;
