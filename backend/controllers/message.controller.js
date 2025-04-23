import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";

import {
  responseHandler,
  errorHandler,
  asyncHandler,
  getIO,
  getSocketId,
} from "../utilities/index.js";
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

  //socket
  const io = getIO();
  const receiverSocketId = getSocketId(receiverId);
  if (receiverSocketId) {
    io.to(receiverSocketId).emit("newMessage", newMessage);
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

const updateMessagesSeen = asyncHandler(async (req, res, next) => {
  const myId = req.userId;
  const senderId = req.params.senderId;
  if (!myId || !req.params.senderId) {
    return next(new errorHandler("all fields are necessary", 400));
  }

  const result = await Message.updateMany(
    { senderId, receiverId: myId, isSeen: false },
    { $set: { isSeen: true } }
  );

  // socket
  const io = getIO();
  const receiverSocketId = getSocketId(senderId); // the msg sender will recieve if msges are seen or not
  if (receiverSocketId) {
    io.to(receiverSocketId).emit("seenMessages", result);
  }

  responseHandler(res, 200, result);
});

export { sendMessage, getMessages, updateMessagesSeen };
