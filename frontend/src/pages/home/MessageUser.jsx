import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../../store/slices/user/user.slice";

function MessageUser({ userData = {} }) {
  const dispatch = useDispatch();
  const { onlineUsers } = useSelector((state) => state.socketReducer);

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
          <p className="text-sm opacity-70">now msg hey bro whats up</p>
        </div>
      </div>
    </li>
  );
}

export default MessageUser;
