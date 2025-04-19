import React from "react";
import { useSelector } from "react-redux";

function ChatBubble({ messageDetails }) {
  const { userData } = useSelector((state) => state.userReducer);
  const side = userData?._id === messageDetails?.senderId ? "end" : "start";

  return (
    messageDetails &&
    messageDetails.message && (
      <div className={`chat ${side === "start" ? "chat-start" : "chat-end"}`}>
        <div
          className={`chat-bubble ${
            side === "start" ? "chat-bubble-neutral" : "chat-bubble-primary"
          }`}
          // className={`chat-bubble chat-bubble-primary`}
        >
          {messageDetails.message}
        </div>
      </div>
    )
  );
}

export default ChatBubble;
