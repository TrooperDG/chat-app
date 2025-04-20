import React from "react";
import { useSelector } from "react-redux";

function MessageBubble({ messageDetails }) {
  const { userData, selectedUserData } = useSelector(
    (state) => state.userReducer
  );
  const isMe = userData?._id === messageDetails?.senderId;
  const time = new Date(messageDetails.createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  // console.log(messageDetails, selectedUserData);

  return (
    messageDetails &&
    messageDetails?.message && (
      <div className={`chat ${isMe ? "chat-end" : "chat-start"}`}>
        <div className={`chat-image avatar`}>
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src={isMe ? userData?.avatar : selectedUserData.avatar}
            />
          </div>
        </div>
        <div className="chat-header">
          <time className="text-xs opacity-50">{time}</time>
        </div>
        <div
          className={`chat-bubble ${
            isMe ? "chat-bubble-primary" : "chat-bubble-neutral"
          }`}
        >
          {messageDetails.message}
        </div>
        {/* <div className="chat-footer opacity-50">Seen at 12:46</div> */}
      </div>
    )
  );
}

export default MessageBubble;
