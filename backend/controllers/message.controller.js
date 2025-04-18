import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";
import { asyncHandler } from "../utilities/asyncHandler.utility.js";
import { errorHandler } from "../utilities/errorHandler.utility.js";
import { responseHandler } from "../utilities/responseHandler.utility.js";
import mongoose from "mongoose";

const sendMessage = asyncHandler(async (req, res, next) => {
  const message = req.body.message;
  const senderId = req.userId;
  const receiverId = req.params.receiverId;

  //validate fields
  if (!message || !senderId || !receiverId) {
    return next(new errorHandler("all fields are necessary", 400));
  }

  //create new message
  const newMessage = await Message.create({ senderId, receiverId, message });

  //find existing conversation
  let conversation = await Conversation.findOneAndUpdate(
    {
      participants: {
        $all: [
          new mongoose.Types.ObjectId(senderId),
          new mongoose.Types.ObjectId(receiverId),
        ],
      },
    },
    {
      $push: { messages: newMessage._id },
    },
    { new: true }
  ).populate("messages");

  //creating new conversation
  if (!conversation) {
    conversation = await Conversation.create({
      participants: [senderId, receiverId],
      messages: [newMessage._id],
    });
  }

  //send response
  responseHandler(res, 201, { newMessage, conversation });
});

const getMessages = asyncHandler(async (req, res, next) => {
  const myId = req.userId;
  const otherParticipantId = req.params.otherParticipantId;

  //validate fields
  if (!myId || !otherParticipantId) {
    return next(new errorHandler("all fields are necessary", 400));
  }

  //find conversation
  let conversation = await Conversation.findOne({
    participants: {
      $all: [
        new mongoose.Types.ObjectId(myId),
        new mongoose.Types.ObjectId(otherParticipantId),
      ],
    },
  })
    .select("messages")
    .populate("messages");

  responseHandler(res, 200, conversation);
});

export { sendMessage, getMessages };
