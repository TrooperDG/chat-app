import React, { useEffect, useRef, useState } from "react";
import MessageBubble from "./MessageBubble";
import { useDispatch, useSelector } from "react-redux";
import { seenMessagesThunk } from "../../store/slices/message/message.thunk";
import {
  addNewMessage,
  updateMessagesAfterSeen,
} from "../../store/slices/message/message.slice";

function Messages() {
  const { messages } = useSelector((state) => state.messageReducer);
  const { selectedUserData, userData } = useSelector(
    (state) => state.userReducer
  );
  const dispatch = useDispatch();

  const prevMessagesCount = useRef(0);

  const handleSeenMessages = async () => {
    if (messages && messages.length > 0) {
      const recievedMessages = messages.filter(
        (message) =>
          message.senderId === selectedUserData._id && message.isSeen === false
      );

      if (recievedMessages.length > 0) {
        await dispatch(seenMessagesThunk({ senderId: selectedUserData._id }));
      }
    }
  };

  useEffect(() => {
    if (selectedUserData) handleSeenMessages();
    // console.log(messages);
  }, [selectedUserData]);

  useEffect(() => {
    if (messages && messages.length > prevMessagesCount.current) {
      prevMessagesCount.current = messages.length;
      handleSeenMessages();
    }
  }, [messages]);

  const { socket } = useSelector((state) => state.socketReducer);
  useEffect(() => {
    if (!socket) return;
    socket.on("newMessage", (message) => {
      dispatch(addNewMessage(message));
    });
    socket.on("seenMessages", (messages) => {
      if (messages && messages.acknowledged) {
        dispatch(updateMessagesAfterSeen(userData._id));
        // const seenSound = new Audio("/sounds/message-seen.mp3");
        // seenSound.volume = 0.3;
        // seenSound.play();
      }
    });
  }, [socket]);

  return (
    <div className="flex flex-col-reverse gap-0.5 h-full overflow-auto px-5">
      {messages &&
        messages.length > 0 &&
        [...messages]
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((messageDetails, index) => (
            <MessageBubble key={index} messageDetails={messageDetails} />
          ))}
    </div>
  );
}

// 6808fb19769ce03748dd2ff7
export default Messages;
