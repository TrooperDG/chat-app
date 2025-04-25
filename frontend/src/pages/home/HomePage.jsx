import React, { useEffect, useRef, useState } from "react";
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
import toast from "react-hot-toast";

function HomePage() {
  const dispatch = useDispatch();
  // adding seen sound------------------------------------------------------------
  const { messageSettings } = useSelector((state) => state.settingsReducer);
  const seenSoundEnabledRef = useRef(messageSettings.seenSound);
  const playSeenSound = () => {
    if (seenSoundEnabledRef.current) {
      const seenSound = new Audio("/sounds/message-seen.mp3");
      seenSound.volume = 0.3;
      seenSound.play();
    }
  };

  // Intitializing Socket------------------------------------------------------------
  const { userData, isAuthenticated, selectedUserData } = useSelector(
    (state) => state.userReducer
  );
  const { socket } = useSelector((state) => state.socketReducer);
  const selectedUserId = useRef(selectedUserData?._id);

  useEffect(() => {
    if (isAuthenticated) dispatch(initializeSocket(userData?._id));
  }, [isAuthenticated]);

  // listening socket --------------------------------------
  useEffect(() => {
    if (!socket) return;

    socket.on("onlineUsers", (onlineUsers) => {
      dispatch(setOnlineUsers(onlineUsers));
    });

    socket.on("newMessage", (message) => {
      if (message?.senderId === selectedUserId.current) {
        dispatch(addNewMessage(message));
      } else {
        toast.success(message.message);
      }
    });

    socket.on("seenMessages", (messages) => {
      // console.log("i see you have seen");
      if (messages && messages.acknowledged) {
        dispatch(updateMessagesAfterSeen(userData._id));
        if (selectedUserId.current) playSeenSound();
      }
    });
    return () => {
      socket.close();
    };
  }, [socket]);

  // updateding selectedUserId-Ref for socket new-message
  useEffect(() => {
    // console.log("changed", selectedUserId.current, selectedUserData?._id);
    selectedUserId.current = selectedUserData?._id;
  }, [selectedUserData?._id]);

  //updateding seenSound-Ref for socket seen-message
  useEffect(() => {
    seenSoundEnabledRef.current = messageSettings.seenSound;
  }, [messageSettings.seenSound]);

  //------------------------------------------------------------------------

  // sidebar open close
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
