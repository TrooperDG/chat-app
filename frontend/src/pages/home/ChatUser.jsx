import React from "react";

function ChatUser() {
  return (
    <div className="flex gap-3  cursor-pointer ">
      <div className="avatar avatar-online">
        <div className="w-12  rounded-full">
          <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <div className="overflow-x-hidden">
        <h3>User Name</h3>
        <p className="text-sm opacity-70">now msg hey bro whats up</p>
      </div>
    </div>
  );
}

export default ChatUser;
