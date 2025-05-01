import React, { useEffect, useState } from "react";
import { MdRefresh } from "react-icons/md";

import { useDispatch, useSelector } from "react-redux";
import {
  getAllLatestUserMessagesThunk,
  getOtherUsersThunk,
} from "../../store/slices/user/user.thunk";

import SearchUsers from "./SearchUsers";
import MessageUser from "./MessageUser";

function UsersSidebar() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const { otherUsersData } = useSelector((state) => state.userReducer);
  // const { latesMessages } = useSelector((state) => state.messageReducer);
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

      setOtherUsers([
        ...sortedUsersWithLatestMessages,
        ...usersWithNoLatestMessages,
      ]);
    }
  }, [otherUsersData]);

  return (
    <div className="w-full max-w-[20rem] p-3 flex flex-col border-r border-r-gray-300 dark:border-r-gray-700 gap-2">
      <div className="flex gap-0.5">
        <SearchUsers handleSearchUser={handleSearchUser} />
        <button
          onClick={handleRefreshOtherUsers}
          className="rounded-[4px] duration-100 px-2 border-1 border-[#454E57] hover:bg-gray-400 dark:hover:bg-gray-600"
        >
          <MdRefresh
            size={22}
            className={`text-gray-400 ${loading && "animate-spin"}`}
          />
        </button>
      </div>
      <ul className="h-full w-full overflow-y-auto pt-1 flex flex-col overflow-x-hidden">
        {otherUsers &&
          otherUsers.map((userData) => (
            <MessageUser key={userData?._id} userData={userData} />
          ))}
      </ul>
    </div>
  );
}

export default UsersSidebar;
