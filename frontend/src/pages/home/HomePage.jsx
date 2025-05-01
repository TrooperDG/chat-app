import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//------------------------------------------------------
import { popNotification } from "./popNotification";

//------------------------------------------------------
import {
  initializeSocket,
  setOnlineUsers,
} from "../../store/slices/socket/socket.slice";

//------------------------------------------------------
import {
  addNewMessage,
  myMessagesAreSeen,
} from "../../store/slices/message/message.slice";

//------------------------------------------------------
import {
  Header,
  SidebarTools,
  MessageContainer,
  UsersSidebar,
} from "../../components";

//------------------------------------------------------
import {
  addUnseenMessageCount,
  moveNewNotificationSenderToTop,
  seenMessageAtUserSideBar,
  setSelectedUser,
} from "../../store/slices/user/user.slice";

//------------------------------------------------------
import {
  playNotificationSound,
  playSeenSound,
  playSendSound,
} from "../../components/utilities";

//========================================================================================

function HomePage() {
  const dispatch = useDispatch();
  // adding seen sound --and-- notification sound and on/off  -----------------------

  const { messageSettings, notificationSettings } = useSelector(
    (state) => state.settingsReducer
  );
  const seenSoundEnabledRef = useRef(messageSettings.seenSound);
  const notificationSettingsRef = useRef(notificationSettings);

  // Intitializing Socket------------------------------------------------------------
  const { userData, isAuthenticated, selectedUserData, otherUsersData } =
    useSelector((state) => state.userReducer);
  const { socket } = useSelector((state) => state.socketReducer);
  // const selectedUserIdRef = useRef(selectedUserData?._id);
  const selectedUserRef = useRef(selectedUserData);

  const otherUsersDataRef = useRef(otherUsersData);

  useEffect(() => {
    if (isAuthenticated) dispatch(initializeSocket(userData?._id));
  }, [isAuthenticated]);

  //.......................................................

  // listening socket -----------------------------------------
  useEffect(() => {
    if (!socket) return;

    socket.on("onlineUsers", (onlineUsers) => {
      dispatch(setOnlineUsers(onlineUsers));
    });

    socket.on("newMessage", (message) => {
      dispatch(moveNewNotificationSenderToTop({ message }));

      if (message?.senderId === selectedUserRef.current?._id) {
        dispatch(addNewMessage(message));
      } else {
        const sender = otherUsersDataRef.current.find(
          (user) => user._id === message.senderId
        );

        if (sender) {
          if (notificationSettingsRef.current.showNotification) {
            // toast.success(`${sender.username} : ${message.message}`); //! update it to jsx
            popNotification(sender, message.message);

            if (notificationSettingsRef.current.notificationSound) {
              playNotificationSound();
            }
          }
          dispatch(addUnseenMessageCount({ otherUserId: sender._id }));
        } else {
          // if no sender available in our otherUsersData , that mean a new user is created , need to add it later
          //  might need to call other usersThunk
        }
      }
    });

    socket.on("seenMessages", (response) => {
      // console.log("i see you have seen");
      if (response?.result?.acknowledged) {
        dispatch(myMessagesAreSeen({ myId: userData._id }));

        if (selectedUserRef.current?._id && seenSoundEnabledRef.current) {
          playSeenSound();
        }

        dispatch(
          seenMessageAtUserSideBar({ otherParticipantId: response.receiverId })
        );
      }
    });
    socket.on("typingStatus", (response) => {
      if (response.from === selectedUserRef.current?._id) {
        dispatch(
          setSelectedUser({
            ...selectedUserRef.current,
            isTyping: response.typing,
          })
        );
      }
    });

    return () => {
      socket.close();
    };
  }, [socket]);

  // updateding selectedUserIdRef-Ref for socket new-message---------------------------
  useEffect(() => {
    selectedUserRef.current = selectedUserData;
  }, [selectedUserData]);

  //updateding seenSound-Ref for socket seen-message,  and notification-----------------
  useEffect(() => {
    seenSoundEnabledRef.current = messageSettings.seenSound;
  }, [messageSettings.seenSound]);
  useEffect(() => {
    notificationSettingsRef.current = notificationSettings;
  }, [notificationSettings]);

  //updateding otherUsersData-Ref for socket new-message--------------------------------
  useEffect(() => {
    otherUsersDataRef.current = otherUsersData;
  }, [otherUsersData]);

  //------------------------------------------------------------------------

  //user- sidebar open close-----------------------------------------------------
  const [isUsersSidebarOpen, setIsUsersSidebarOpen] = useState(true);
  const [option, setOption] = useState("Chats"); // and "All" , in future -> "favourites", "archived"

  const handleOpenUserSidebar = () => {
    setIsUsersSidebarOpen(true);
  };
  const handleCloseUserSidebar = () => {
    setIsUsersSidebarOpen(false);
  };
  const setUserSideBarOption = (option) => {
    setOption(option);
  };

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <main className="flex w-full h-full overflow-auto">
        <SidebarTools
          option={option}
          isUsersSidebarOpen={isUsersSidebarOpen}
          handleOpenUserSidebar={handleOpenUserSidebar}
          setUserSideBarOption={setUserSideBarOption}
        />
        {isUsersSidebarOpen && (
          <UsersSidebar
            option={option}
            handleCloseUserSidebar={handleCloseUserSidebar}
          />
        )}
        <MessageContainer />
      </main>
    </div>
  );
}

export default HomePage;
