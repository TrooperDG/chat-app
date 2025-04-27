import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../../store/slices/user/user.slice";

//checkmark icons
import { IoCheckmark } from "react-icons/io5";
import { IoCheckmarkDone } from "react-icons/io5";

import { IoMdCheckmark } from "react-icons/io";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

function MessageUser({ userData = {} }) {
  const dispatch = useDispatch();
  const { onlineUsers } = useSelector((state) => state.socketReducer);
  // const { notifications, latesMessages } = useSelector(
  //   (state) => state.messageReducer
  // );

  // const userNotifications = notifications.filter(
  //   (message) => message.senderId === userData._id
  // );
  // const userLatestMessage = latesMessages.find(
  //   (message) =>
  //     message.senderId === userData._id || message.receiverId === userData._id
  // );
  // console.log("--------", userNotifications);
  // const latestMessage =
  //   userNotifications && userNotifications?.length > 0
  //     ? userNotifications.reduce((latest, message) =>
  //         new Date(message.createdAt) > new Date(latest.createdAt)
  //           ? message
  //           : latest
  //       )
  //     : null;

  const isOnline = onlineUsers?.includes(userData?._id);
  // console.log(isOnline, onlineUsers);

  const handleSelectUser = () => {
    dispatch(setSelectedUser(userData));
  };

  return (
    <li
      onClick={handleSelectUser}
      className=" border-b border-b-gray-300 dark:border-b-gray-700  p-2"
    >
      <div className="flex gap-3  cursor-pointer ">
        <div
          className={`avatar ${isOnline ? "avatar-online" : "avatar-offline"} `}
        >
          <div className="w-12  rounded-full">
            {/* <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" /> */}
            <img src={userData?.avatar} />
          </div>
        </div>
        <div className="overflow-x-hidden">
          <h3>{userData?.username}</h3>
          <p className="text-sm opacity-70 flex items-center gap-0.5">
            {userData?.latestMessage?.receiverId === userData._id && (
              <span className="">
                {/* if i am the sender ie. other guy is the reciever then show ✔✔ */}
                {userData?.latestMessage?.isSeen ? (
                  <IoMdCheckmarkCircleOutline
                    size={16}
                    className="text-cyan-400 "
                  />
                ) : (
                  <IoMdCheckmark size={16} className="text-gray-400 mt-1" />
                )}
              </span>
            )}
            <span>
              {userData?.latestMessage?.message || (
                <small className="text-gray-400 ">Start a chat</small>
              )}
            </span>
          </p>
        </div>
      </div>
    </li>
  );
}

export default MessageUser;
