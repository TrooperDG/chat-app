import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MdRefresh } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

import { useDispatch, useSelector } from "react-redux";
import {
  getAllLatestUserMessagesThunk,
  getOtherUsersThunk,
} from "../../store/slices/user/user.thunk";

import SearchUsers from "./SearchUsers";
import MessageUser from "./MessageUser";

function UsersSidebar({ option, handleCloseUserSidebar }) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const { otherUsersData } = useSelector((state) => state.userReducer);
  const [otherUsers, setOtherUsers] = useState([]);

  const handleSearchUser = (e) => {
    if (e.target.value?.trim()) {
      setOtherUsers(
        otherUsersData?.filter((user) =>
          user.username
            ?.trim()
            ?.toLowerCase()
            ?.includes(e.target.value?.trim()?.toLowerCase())
        )
      );
    } else {
      setOtherUsers(otherUsersData);
    }
  };
  const handleRefreshOtherUsers = async () => {
    setLoading(true);
    await dispatch(getOtherUsersThunk());
    await dispatch(getAllLatestUserMessagesThunk()); // least chat the is shown in the userSidebar
    setLoading(false);
  };

  useEffect(() => {
    handleRefreshOtherUsers();
    // console.log("kitni");
  }, []);

  useEffect(() => {
    if (otherUsersData?.length > 0) {
      const sortedUsersWithLatestMessages = otherUsersData
        .filter((user) => user?.latestMessage)
        .sort(
          (a, b) =>
            new Date(b.latestMessage?.createdAt) -
            new Date(a.latestMessage?.createdAt)
        );

      const usersWithNoLatestMessages = otherUsersData.filter(
        (user) => !user?.latestMessage
      );

      if (option === "Chats") {
        setOtherUsers([...sortedUsersWithLatestMessages]);
      } else if (option === "All") {
        setOtherUsers([
          ...sortedUsersWithLatestMessages,
          ...usersWithNoLatestMessages,
        ]);
      }
    }
  }, [otherUsersData, option]);

  // for mobile view --------------------------------------------------------
  const { isMobile } = useSelector(
    (state) => state.settingsReducer?.UISettings
  );

  //---------------------------------------------------------------------------
  return (
    <div
      className={`w-full ${
        !isMobile && "max-w-[20rem]"
      } p-3 flex flex-col border-r border-r-gray-300 dark:border-r-gray-700 gap-2 `}
    >
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-lg font-semibold">{option}</h1>
        {!isMobile && (
          <button
            onClick={handleCloseUserSidebar}
            className="rounded-[4px] duration-100 hover:bg-gray-300 dark:hover:bg-gray-700 p-0.5"
          >
            <RxCross2 size={22} />
          </button>
        )}
      </div>
      <div className="flex gap-0.5">
        <SearchUsers handleSearchUser={handleSearchUser} />
        <button
          onClick={handleRefreshOtherUsers}
          className="btn btn-square btn-soft"
        >
          <MdRefresh
            size={22}
            className={`text-gray-500 dark:text-gray-400 ${
              loading && "animate-spin"
            }`}
          />
        </button>
      </div>
      <motion.ul
        initial={{ y: "20px", opacity: 0 }}
        animate={{ y: "0px", opacity: 1 }}
        exit={{ y: "20px", opacity: 0 }}
        transition={{ type: "tween", duration: 0.5, ease: "easeInOut" }}
        className="h-full w-full overflow-y-auto pt-1 flex flex-col overflow-x-hidden"
      >
        {otherUsers && otherUsers.length > 0 ? (
          otherUsers.map((userData) => (
            <MessageUser key={userData?._id} userData={userData} />
          ))
        ) : (
          <h1 className="w-full text-center text-lg text-gray-500">
            Click on ALL users to find new friends!
          </h1>
        )}
      </motion.ul>
    </div>
  );
}

export default UsersSidebar;
