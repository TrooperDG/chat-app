import React from "react";

function ChatBubble({ side }) {
  return (
    <div className={`chat chat-${side}`}>
      <div
        className={`chat-bubble chat-bubble-${
          side === "start" ? "neutral" : "primary"
        }`}
      >
        What kind of nonsense is this
      </div>
    </div>
  );
}

export default ChatBubble;
