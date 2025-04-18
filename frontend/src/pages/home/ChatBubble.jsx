import React from "react";

function ChatBubble({ message = "", side = "end" }) {
  return (
    message.length > 0 && (
      <div className={`chat chat-${side}`}>
        <div
          className={`chat-bubble chat-bubble-${
            side === "start" ? "neutral" : "primary"
          }`}
          // className={`chat-bubble chat-bubble-primary`}
        >
          {message}
        </div>
      </div>
    )
  );
}

export default ChatBubble;
