import express from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import {
  sendMessage,
  getMessages,
  updateMessagesSeen,
  getLatestMessages,
} from "../controllers/message.controller.js";

const messageRouter = express.Router();

messageRouter.post("/send/:receiverId", isAuthenticated, sendMessage);
messageRouter.get(
  "/get-messages/:otherParticipantId",
  isAuthenticated,
  getMessages
);
messageRouter.put("/seen/:senderId", isAuthenticated, updateMessagesSeen);
messageRouter.get("/get-latest-messages", isAuthenticated, getLatestMessages);

export default messageRouter;
