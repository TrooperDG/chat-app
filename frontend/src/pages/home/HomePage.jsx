import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import ChatBox from "./ChatBox";
import { Logout } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import {
  initializeSocket,
  setOnlineUsers,
} from "../../store/slices/socket/socket.slice";
import { addNewMessage } from "../../store/slices/message/message.slice";

function HomePage() {
  const dispatch = useDispatch();
  const { userData, isAuthenticated } = useSelector(
    (state) => state.userReducer
  );
  // console.log(userData);
  const { socket } = useSelector((state) => state.socketReducer);

  useEffect(() => {
    if (isAuthenticated) dispatch(initializeSocket(userData?._id));
  }, [isAuthenticated]);

  useEffect(() => {
    if (!socket) return;
    socket.on("onlineUsers", (onlineUsers) => {
      // console.log(onlineUsers);
      dispatch(setOnlineUsers(onlineUsers));
    });
    socket.on("newMessage", (message) => {
      dispatch(addNewMessage(message));
    });
    return () => {
      socket.close();
    };
  }, [socket]);

  return (
    <div className="h-screen flex flex-col">
      <div className="flex border-b border-b-gray-300 dark:border-b-gray-700">
        <h1 className="text-2xl font-semibold p-2 ">TalkNest</h1>
        <Logout />
      </div>
      <main className="flex w-full h-full overflow-auto">
        <Sidebar />
        <ChatBox />
      </main>
    </div>
  );
}

export default HomePage;
