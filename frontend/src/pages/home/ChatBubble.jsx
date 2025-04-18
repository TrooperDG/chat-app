import React from "react";
import { useSelector } from "react-redux";

function ChatBubble({ messageDetails }) {
  const { userData } = useSelector((state) => state.userReducer);
  const side = userData?._id === messageDetails?.senderId ? "end" : "start";

  return (
    messageDetails &&
    messageDetails.message && (
      <div className={`chat chat-${side}`}>
        <div
          className={`chat-bubble chat-bubble-${
            side === "start" ? "neutral" : "primary"
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
