import React from "react";
import ChatUser from "./ChatUser";

function Sidebar() {
  return (
    <div className="w-full max-w-[20rem] p-3 flex flex-col border-r border-r-gray-300 dark:border-r-gray-700 gap-2">
      <div>
        <label className="input">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input type="search" required placeholder="Search" />
        </label>
      </div>
      <div className="h-full overflow-y-auto pt-1 flex flex-col">
        <div className=" border-b border-b-gray-300 dark:border-b-gray-700  p-2">
          <ChatUser />
        </div>
        <div className=" border-b border-b-gray-300 dark:border-b-gray-700  p-2">
          <ChatUser />
        </div>
        <div className=" border-b border-b-gray-300 dark:border-b-gray-700  p-2">
          <ChatUser />
        </div>
        <div className=" border-b border-b-gray-300 dark:border-b-gray-700  p-2">
          <ChatUser />
        </div>
        <div className=" border-b border-b-gray-300 dark:border-b-gray-700  p-2">
          <ChatUser />
        </div>
        <div className=" border-b border-b-gray-300 dark:border-b-gray-700  p-2">
          <ChatUser />
        </div>
        <div className=" border-b border-b-gray-300 dark:border-b-gray-700  p-2">
          <ChatUser />
        </div>
        <div className=" border-b border-b-gray-300 dark:border-b-gray-700  p-2">
          <ChatUser />
        </div>
        <div className=" border-b border-b-gray-300 dark:border-b-gray-700  p-2">
          <ChatUser />
        </div>
        <div className=" border-b border-b-gray-300 dark:border-b-gray-700  p-2">
          <ChatUser />
        </div>
        <div className=" border-b border-b-gray-300 dark:border-b-gray-700  p-2">
          <ChatUser />
        </div>
        <div className=" border-b border-b-gray-300 dark:border-b-gray-700  p-2">
          <ChatUser />
        </div>
        <div className=" border-b border-b-gray-300 dark:border-b-gray-700  p-2">
          <ChatUser />
        </div>
        <div className=" border-b border-b-gray-300 dark:border-b-gray-700  p-2">
          <ChatUser />
        </div>
        <div className=" border-b border-b-gray-300 dark:border-b-gray-700  p-2">
          <ChatUser />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
