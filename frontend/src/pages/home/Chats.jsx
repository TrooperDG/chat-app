import React from "react";
import ChatBubble from "./ChatBubble";
import { useSelector } from "react-redux";

function Chats() {
  const { messages } = useSelector((state) => state.messageReducer);
  const { userData } = useSelector((state) => state.userReducer);

  return (
    <div className="flex flex-col-reverse h-full overflow-auto px-5">
      {messages &&
        messages.length > 0 &&
        [...messages]
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((item) => (
            <ChatBubble
              key={item._id}
              message={item.message}
              side={userData?._id === item?.senderId ? "end" : "start"}
            />
          ))}
    </div>
  );
}

export default Chats;
