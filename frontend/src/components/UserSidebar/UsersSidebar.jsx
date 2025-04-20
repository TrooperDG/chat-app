import React, { useEffect, useState } from "react";
import { MdRefresh } from "react-icons/md";

import { useDispatch, useSelector } from "react-redux";
import { getOtherUsersThunk } from "../../store/slices/user/user.thunk";

import SearchUsers from "./SearchUsers";
import MessageUser from "./MessageUser";

function UsersSidebar() {
  const { otherUsersData } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

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

  useEffect(() => {
    (async () => {
      await dispatch(getOtherUsersThunk());
    })();
  }, []);

  useEffect(() => {
    if (otherUsersData?.length > 0) setOtherUsers(otherUsersData);
  }, [otherUsersData]);

  return (
    <div className="w-full max-w-[20rem] p-3 flex flex-col border-r border-r-gray-300 dark:border-r-gray-700 gap-2">
      <div className="flex">
        <SearchUsers handleSearchUser={handleSearchUser} />
        <button className="rounded-[4px] border-1 border-[#454E57]">
          <MdRefresh size={22} className="text-gray-500" />
        </button>
      </div>
      <ul className="h-full overflow-y-auto pt-1 flex flex-col">
        {otherUsers &&
          otherUsers.map((userData) => (
            <MessageUser key={userData?._id} userData={userData} />
          ))}
      </ul>
    </div>
  );
}

export default UsersSidebar;
