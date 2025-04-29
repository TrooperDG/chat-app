import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../../store/slices/user/user.slice";

//checkmark icons
import { IoCheckmark } from "react-icons/io5";
import { IoCheckmarkDone } from "react-icons/io5";

function MessageUser({ userData = {} }) {
  const dispatch = useDispatch();
  const { onlineUsers } = useSelector((state) => state.socketReducer);

  const isOnline = onlineUsers?.includes(userData?._id);

  const handleSelectUser = () => {
    dispatch(setSelectedUser(userData));
  };

  return (
    <li
      onClick={handleSelectUser}
      className=" border-b border-b-gray-300 dark:border-b-gray-700  p-2 flex justify-between items-center"
    >
      <div className="flex gap-3  cursor-pointer ">
        <div
          className={`avatar ${isOnline ? "avatar-online" : "avatar-offline"} `}
        >
          <div className="w-12  rounded-full">
            <img src={userData?.avatar} />
          </div>
        </div>
        <div className="overflow-x-hidden ">
          <h3>{userData?.username}</h3>
          <p className="text-sm opacity-70 flex items-center gap-0.5">
            {userData?.latestMessage?.receiverId === userData._id && (
              <span className="">
                {/* if i am the sender ie. other guy is the reciever then show ✔✔ */}
                {userData?.latestMessage?.isSeen ? (
                  <IoCheckmarkDone size={16} className="text-cyan-400 " />
                ) : (
                  <IoCheckmark size={16} className="text-gray-400 mt-1" />
                )}
              </span>
            )}
            <span className="truncate">
              {userData?.latestMessage?.message || (
                <small className="text-gray-400 ">Start a chat</small>
              )}
            </span>
          </p>
        </div>
      </div>
      {userData?.unseenMesageCount > 0 && (
        <div className="bg-green-400 px-1.5  h-5 min-w-5 rounded-full flex justify-center items-center text-sm text-black font-semibold">
          {userData?.unseenMesageCount}
        </div>
      )}
    </li>
  );
}

export default MessageUser;
