import express from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { sendMessage, getMessages } from "../controllers/message.controller.js";

const messageRouter = express.Router();

messageRouter.post("/send/:receiverId", isAuthenticated, sendMessage);
messageRouter.get(
  "/get-messages/:otherParticipantId",
  isAuthenticated,
  getMessages
);

export default messageRouter;
