import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  initializeSocket,
  setOnlineUsers,
} from "../../store/slices/socket/socket.slice";
import {
  addNewMessage,
  updateMessagesAfterSeen,
} from "../../store/slices/message/message.slice";
import {
  Header,
  SidebarTools,
  MessageContainer,
  UsersSidebar,
} from "../../components";

function HomePage() {
  const dispatch = useDispatch();

  // Intitializing Socket
  const { userData, isAuthenticated } = useSelector(
    (state) => state.userReducer
  );

  useEffect(() => {
    if (isAuthenticated) dispatch(initializeSocket(userData?._id));
  }, [isAuthenticated]);

  const { socket } = useSelector((state) => state.socketReducer);
  useEffect(() => {
    if (!socket) return;
    socket.on("onlineUsers", (onlineUsers) => {
      dispatch(setOnlineUsers(onlineUsers));
    });
    // socket.on("newMessage", (message) => {
    //   dispatch(addNewMessage(message));
    // });
    // socket.on("seenMessages", (messages) => {
    //   if (messages && messages.acknowledged) {
    //     dispatch(updateMessagesAfterSeen(userData._id));
    //   }
    // });
    return () => {
      socket.close();
    };
  }, [socket]);

  const [isUsersSidebarOpen, setIsUsersSidebarOpen] = useState(true);
  const handleOpenUserSidebar = () => {
    setIsUsersSidebarOpen((prev) => !prev);
  };

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <main className="flex w-full h-full overflow-auto">
        <SidebarTools
          isUsersSidebarOpen={isUsersSidebarOpen}
          handleOpenUserSidebar={handleOpenUserSidebar}
        />
        {isUsersSidebarOpen && <UsersSidebar />}
        <MessageContainer />
      </main>
    </div>
  );
}

export default HomePage;
