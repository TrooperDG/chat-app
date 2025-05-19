import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import SendMessage from "./SendMessage";
import Messages from "./Messages";
import { getMessagesThunk } from "../../store/slices/message/message.thunk";
import { setSelectedUser } from "../../store/slices/user/user.slice";
import { setUISettings } from "../../store/slices/settings/settings.silce";
import { formatLastSeen } from "../utilities";

function MessageContainer() {
  const dispatch = useDispatch();

  const { selectedUserData, otherUsersData } = useSelector(
    (state) => state.userReducer
  );
  const { onlineUsers } = useSelector((state) => state.socketReducer);

  const isOnline = onlineUsers?.includes(selectedUserData?._id);

  const handleCloseChat = () => {
    dispatch(setSelectedUser(null));
    dispatch(setUISettings({ isChatOpen: false })); //! need to make :: if user clicks back button **
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
    if (selectedUserData !== null) {
      dispatch(setUISettings({ isChatOpen: true }));
    }
  }, [selectedUserData]);

  // since we are getiing the selected user from localStorage so updating the last seen
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
                : formatLastSeen(selectedUserData?.lastSeen)}
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
