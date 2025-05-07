import React from "react";
import { Logout } from "../index";
import { useDispatch, useSelector } from "react-redux";
import { setAccountSettings } from "../../store/slices/settings/settings.silce";

function Header() {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.userReducer);
  return (
    <div className="flex justify-between border-b border-b-gray-300 dark:border-b-gray-700">
      <div id="logo" className="flex items-center">
        <h1 className="text-2xl font-semibold p-2 ">TalkNest</h1>
      </div>
      <div id="userProfile-settings" className="p-2 flex gap-2 items-center">
        <p className="">{userData?.username}</p>
        <button
          onMouseDown={() =>
            dispatch(setAccountSettings({ isAccountTabOpen: true }))
          }
        >
          <img
            className="w-8 h-8 border-2 border-primary rounded-full"
            src={userData?.avatar}
            alt=""
          />
        </button>
      </div>
    </div>
  );
}

export default Header;
