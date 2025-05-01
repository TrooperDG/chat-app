import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import SendMessage from "./SendMessage";
import Messages from "./Messages";
import { getMessagesThunk } from "../../store/slices/message/message.thunk";
import { setSelectedUser } from "../../store/slices/user/user.slice";

function MessageContainer() {
  const { selectedUserData } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleCloseChat = () => {
    dispatch(setSelectedUser(null));
  };

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      if (selectedUserData) {
        await dispatch(
          getMessagesThunk({ otherParticipantId: selectedUserData?._id })
        );
      }
      setLoading(false);
    };
    getMessages();
  }, [selectedUserData]);

  return selectedUserData ? (
    <div className="w-full h-full flex flex-col">
      <div className="p-3 border-b border-b-gray-300 dark:border-b-gray-700  flex justify-between">
        <div className="flex gap-3  cursor-pointer ">
          <div className="avatar avatar-online">
            <div className="w-12  rounded-full">
              <img src={selectedUserData?.avatar} />
            </div>
          </div>
          <div className="overflow-x-hidden">
            <h3>{selectedUserData?.username}</h3>
            <p className="text-sm opacity-70 mt-1">
              {selectedUserData?.isTyping ? "typing..." : "sleeping"}
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
