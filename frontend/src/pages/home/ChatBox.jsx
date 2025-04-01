import React from "react";
import ChatUser from "./ChatUser";
import ChatBubble from "./ChatBubble";

function ChatBox() {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="p-3 border-b border-b-gray-300 dark:border-b-gray-700">
        <ChatUser />
      </div>
      <div className="flex flex-col-reverse h-full overflow-auto px-5">
        <ChatBubble side={"end"} />
        <ChatBubble side={"start"} />
        <ChatBubble side={"start"} />
      </div>
      <div className="p-3 flex gap-2">
        <input type="text" placeholder="Type here" className="input w-full" />
        <button className="btn btn-primary">Send</button>
      </div>
    </div>
  );
}

export default ChatBox;
