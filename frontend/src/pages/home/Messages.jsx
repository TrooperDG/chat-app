import React from "react";
import MessageBubble from "./MessageBubble";
import { useSelector } from "react-redux";

function Messages() {
  const { messages } = useSelector((state) => state.messageReducer);

  return (
    <div className="flex flex-col-reverse h-full overflow-auto px-5">
      {messages &&
        messages.length > 0 &&
        [...messages]
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((messageDetails) => (
            <MessageBubble
              key={messageDetails._id}
              messageDetails={messageDetails}
            />
          ))}
    </div>
  );
}

export default Messages;
