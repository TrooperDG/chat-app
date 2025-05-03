import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import SendMessage from "./SendMessage";
import Messages from "./Messages";
import { getMessagesThunk } from "../../store/slices/message/message.thunk";
import { setSelectedUser } from "../../store/slices/user/user.slice";

function MessageContainer() {
  const dispatch = useDispatch();

  const { selectedUserData, otherUsersData } = useSelector(
    (state) => state.userReducer
  );
  const { onlineUsers } = useSelector((state) => state.socketReducer);

  const isOnline = onlineUsers?.includes(selectedUserData?._id);
  const formateLastSeen = new Date(
    selectedUserData?.lastSeen
  ).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, // change to true if you want AM/PM
  });

  const handleCloseChat = () => {
    dispatch(setSelectedUser(null));
  };

  useEffect(() => {
    const getMessages = async () => {
      if (selectedUserData) {
        await dispatch(
          getMessagesThunk({ otherParticipantId: selectedUserData?._id })
        );
      }
    };
    getMessages();
  }, [selectedUserData]);

  // since we are getiing the selected user from localStorage so updating the last seen
  // const isOnlineRef = useRef(onlineUsers?.includes(selectedUserData?._id));
  useEffect(() => {
    if (otherUsersData?.length > 0) {
      const user = otherUsersData.find(
        (user) =>
          user?._id === selectedUserData?._id &&
          user?.lastSeen !== selectedUserData?.lastSeen
      );
      if (user) {
        dispatch(setSelectedUser(user));
      }
    }
  }, [otherUsersData]);

  // setting lastSeen = new Date() when the user goes online to offline
  // useEffect(() => {
  //   if (isOnlineRef?.current && !isOnline) {
  //     if (otherUsersData?.length > 0) {
  //       const user = otherUsersData.find(
  //         (user) => user?._id === selectedUserData?._id
  //       );
  //       if (user) {
  //         dispatch(
  //           setSelectedUser({ ...user, lastSeen: new Date().toISOString() })
  //         );
  //       }
  //     }
  //   }

  //   isOnlineRef.current = isOnline;
  // }, [isOnline]);

  return selectedUserData ? (
    <div className="w-full h-full flex flex-col">
      <div className="p-3 border-b border-b-gray-300 dark:border-b-gray-700  flex justify-between">
        <div className="flex gap-3  cursor-pointer ">
          <div className="avatar">
            <div className="w-12  rounded-full">
              <img src={selectedUserData?.avatar} />
            </div>
          </div>
          <div className="overflow-x-hidden">
            <h3>{selectedUserData?.username}</h3>
            <p className="text-sm opacity-70 mt-1">
              {isOnline
                ? selectedUserData?.isTyping
                  ? "typing..."
                  : "online"
                : `last seen at ${formateLastSeen}` || "offline"}
            </p>
          </div>
        </div>
        <div>
          <button onClick={handleCloseChat} className="btn btn-outline">
            Close
          </button>
        </div>
      </div>
      <Messages />
      <SendMessage />
    </div>
  ) : (
    <div className="h-full w-full flex justify-center items-center ">
      <h1 className="text-3xl inline-block text-primary-content">
        Start a chat
      </h1>
    </div>
  );
}

export default MessageContainer;
