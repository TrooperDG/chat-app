import React, { useEffect, useState } from "react";
import MessageUser from "./MessageUser";
import { useDispatch, useSelector } from "react-redux";
import { getOtherUsersThunk } from "../../store/slices/user/user.thunk";

function UsersSidebar() {
  const { otherUsersData } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const [otherUsers, setOtherUsers] = useState([]);

  const handleSearchUser = (e) => {
    // console.log("heyy");
    // console.log(e.target.value?.trim());
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
      <div>
        <label className="input">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            onChange={handleSearchUser}
            type="search"
            required
            placeholder="Search"
          />
        </label>
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
