import React from "react";
import Sidebar from "./Sidebar";
import ChatBox from "./ChatBox";

function HomePage() {
  return (
    <div className="h-screen flex flex-col">
      <div className="border-b border-b-gray-300 dark:border-b-gray-700">
        <h1 className="text-2xl font-semibold p-2 ">TalkNest</h1>
      </div>
      <main className="flex w-full h-full overflow-auto">
        <Sidebar />
        <ChatBox />
      </main>
    </div>
  );
}

export default HomePage;
