import React, { useEffect, useState } from "react";
import ChatUser from "./ChatUser";
import ChatBubble from "./ChatBubble";
import { useDispatch, useSelector } from "react-redux";

import ChatInput from "./ChatInput";
import Chats from "./Chats";
import { getMessagesThunk } from "../../store/slices/message/message.thunk";

function ChatBox() {
  const { selectedUserData } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

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
  return (
    <div className="w-full h-full flex flex-col">
      {selectedUserData ? (
        <>
          <div className="p-3 border-b border-b-gray-300 dark:border-b-gray-700">
            <div className="flex gap-3  cursor-pointer ">
              <div className="avatar avatar-online">
                <div className="w-12  rounded-full">
                  <img src={selectedUserData?.avatar} />
                </div>
              </div>
              <div className="overflow-x-hidden">
                <h3>{selectedUserData?.username}</h3>
                <p className="text-sm opacity-70 mt-1">typing...</p>
              </div>
            </div>
          </div>
          <Chats />
          <ChatInput />
        </>
      ) : (
        <div className="h-full w-full flex justify-center items-center ">
          <h1 className="text-3xl inline-block text-primary-content">
            Start a chat
          </h1>
        </div>
      )}
    </div>
  );
}

export default ChatBox;
