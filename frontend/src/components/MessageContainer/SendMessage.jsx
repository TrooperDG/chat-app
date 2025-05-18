import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessageThunk } from "../../store/slices/message/message.thunk";
import { moveNewNotificationSenderToTop } from "../../store/slices/user/user.slice";
import { useTypingStatus } from "../../hooks";
import { playSendSound } from "../utilities";
import { addNewMessage } from "../../store/slices/message/message.slice";

function SendMessage() {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const { selectedUserData, userData } = useSelector(
    (state) => state.userReducer
  );
  const { messageSettings } = useSelector((state) => state.settingsReducer);

  const handleSendMessage = async () => {
    //  sending to backend
    dispatch(
      sendMessageThunk({
        receiverId: selectedUserData._id,
        message: message.trim(),
      })
    );

    //-----------------------------------------------------------------

    // creating this custom message data to give the user a fast experience .
    const messageData = {
      createdAt: new Date().toISOString(),
      isSeen: false,
      message: message.trim(),
      receiverId: selectedUserData._id,
      senderId: userData._id,
      _id: Date.now(), // temporary Id,
    };

    dispatch(addNewMessage(messageData));

    dispatch(
      moveNewNotificationSenderToTop({
        message: messageData,
      })
    );

    if (messageSettings.sendSound) {
      playSendSound();
    }
    setMessage("");
  };

  //socket and typing status -----------------------------------

  const { socket } = useSelector((state) => state.socketReducer);
  const handleTypingStart = () => {
    if (socket)
      socket.emit("typingStatus", { to: selectedUserData._id, typing: true });
  };

  const handleTypingStop = () => {
    socket.emit("typingStatus", {
      to: selectedUserData._id,
      typing: false,
    });
  };

  const onType = useTypingStatus(handleTypingStart, handleTypingStop);

  return (
    <div className="p-3 flex gap-2">
      <input
        onChange={(e) => {
          setMessage(e.target.value);
          onType(); // calling the typing detector
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && message.trim().length > 0) {
            handleSendMessage();
          }
        }}
        value={message}
        type="text"
        placeholder="Type here"
        className="input w-full"
      />
      <button
        className="btn btn-primary"
        disabled={message.trim().length > 0 ? false : true}
        onClick={handleSendMessage}
      >
        Send
      </button>
    </div>
  );
}

export default SendMessage;
