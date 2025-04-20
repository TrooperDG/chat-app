import React from "react";
import { useSelector } from "react-redux";

function MessageBubble({ messageDetails }) {
  const { userData } = useSelector((state) => state.userReducer);
  const side = userData?._id === messageDetails?.senderId ? "end" : "start";

  return (
    messageDetails &&
    messageDetails.message && (
      // <div className={`chat ${side === "start" ? "chat-start" : "chat-end"}`}>
      //   <div
      //     className={`chat-bubble ${
      //       side === "start" ? "chat-bubble-neutral" : "chat-bubble-primary"
      //     }`}
      //     // className={`chat-bubble chat-bubble-primary`}
      //   >
      //     {messageDetails.message}
      //   </div>
      // </div>
      <div className={`chat ${side === "start" ? "chat-start" : "chat-end"}`}>
        <div className={`chat-image avatar`}>
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src={userData?.avatar}
            />
          </div>
        </div>
        <div className="chat-header">
          <time className="text-xs opacity-50">12:46</time>
        </div>
        <div
          className={`chat-bubble ${
            side === "start" ? "chat-bubble-neutral" : "chat-bubble-primary"
          }`}
        >
          {messageDetails.message}
        </div>
        <div className="chat-footer opacity-50">Seen at 12:46</div>
      </div>
    )
  );
}

export default MessageBubble;
