import React, { useEffect } from "react";
import { useSelector } from "react-redux";

function MessageBubble({ messageDetails }) {
  const { userData, selectedUserData } = useSelector(
    (state) => state.userReducer
  );
  const { messageSettings } = useSelector((state) => state.settingsReducer);
  const isMeSender = userData?._id === messageDetails?.senderId;
  const time = new Date(messageDetails.createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  useEffect(() => {
    if (!messageDetails) return;
    if (
      !messageDetails.isSeen &&
      !isMeSender &&
      messageSettings.receivedSound
    ) {
      const receivedSound = new Audio("/sounds/message-received.mp3");
      receivedSound.volume = 0.2;
      receivedSound.play();
      console.log("received");
    } else if (
      !messageDetails.isSeen &&
      isMeSender &&
      messageSettings.sendSound
    ) {
      const sendSound = new Audio("/sounds/message-send.wav");
      sendSound.play();
    }
  }, [messageDetails]);

  return (
    messageDetails &&
    messageDetails?.message && (
      <div className={`chat ${isMeSender ? "chat-end" : "chat-start"}`}>
        <div className={`chat-image avatar`}>
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src={isMeSender ? userData?.avatar : selectedUserData.avatar}
            />
          </div>
        </div>
        <div className="chat-header">
          <time className="text-xs opacity-50">{time}</time>
        </div>
        <div
          className={`chat-bubble ${
            isMeSender ? "chat-bubble-primary" : "chat-bubble-neutral"
          }`}
        >
          {messageDetails.message}
        </div>
        {isMeSender && (
          <div className="chat-footer opacity-50">
            {messageDetails.isSeen ? "Seen" : "Delivered"}
          </div>
        )}
      </div>
    )
  );
}

export default MessageBubble;
