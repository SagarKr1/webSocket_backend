import express from "express";
import signupController from "../controllers/signup.controller.js";
import loginController from "../controllers/login.controller.js";
import { getAllUsers } from "../controllers/userList.controller.js";
import auth from "../middleware/auth.middleware.js";
import {getMyChats} from "../controllers/chatUserList.controller.js";
import {sendChatRequest,getReceivedRequests,getSentRequests,acceptChatRequest} from "../controllers/chatRequest.controller.js"

const router = express.Router();

/* ================= PUBLIC APIs ================= */

router.post("/signup", signupController);
router.post("/login", loginController);

/* ================= PRIVATE APIs ================= */

router.get("/user", auth, getAllUsers);


/* ================== USER TAB =================== */

router.post("/user/send", auth, sendChatRequest);
router.get("/user/sent", auth, getSentRequests);
router.get("/user/received", auth, getReceivedRequests);
router.post("/user/accept/:id", auth, acceptChatRequest); 

/* ================== CHAT =======================*/

router.get("/chats", auth, getMyChats);


export default router;
