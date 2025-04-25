import React, { useEffect, useRef, useState } from "react";
import MessageBubble from "./MessageBubble";
import { useDispatch, useSelector } from "react-redux";
import { seenMessagesThunk } from "../../store/slices/message/message.thunk";
import { updateMessagesAfterSeen } from "../../store/slices/message/message.slice";

function Messages() {
  const dispatch = useDispatch();

  const { messages } = useSelector((state) => state.messageReducer);
  const { selectedUserData, userData } = useSelector(
    (state) => state.userReducer
  );

  // setting prev-selectedUser, and prev-messagesCount
  const prevMessagesCount = useRef(0);
  const prevSelectedUserId = useRef(selectedUserData._id);

  //sending thr
  const handleSeenMessages = async () => {
    if (messages && messages.length > 0) {
      const recievedMessages = messages.filter(
        (message) =>
          message.senderId === selectedUserData._id && message.isSeen === false
      );

      if (recievedMessages.length > 0) {
        await dispatch(seenMessagesThunk({ senderId: selectedUserData._id })); //sending that i have seen your msg
        dispatch(updateMessagesAfterSeen(selectedUserData._id)); // saving that i have seen your msg
      }
    }
  };

  useEffect(() => {
    if (selectedUserData) handleSeenMessages();
  }, [selectedUserData]);

  useEffect(() => {
    if (prevSelectedUserId.current != selectedUserData._id) {
      //after the conversation loads checks if the prev-selectedUser is changed.
      prevSelectedUserId.current = selectedUserData._id;
      handleSeenMessages();
    } else if (messages && messages.length > prevMessagesCount.current) {
      //checks if the prev-messages count is changed .
      prevMessagesCount.current = messages.length;
      handleSeenMessages();
    }
  }, [messages]);

  return (
    <div className="flex flex-col-reverse gap-0.5 h-full overflow-auto px-5">
      {/* filtering the messages bewtween me and the selected user */}
      {messages &&
        messages.length > 0 &&
        [
          ...messages.filter(
            (message) =>
              message.senderId === selectedUserData._id ||
              message.receiverId === selectedUserData._id
          ),
        ]
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((messageDetails, index) => (
            <MessageBubble key={index} messageDetails={messageDetails} />
          ))}
    </div>
  );
}

export default Messages;
