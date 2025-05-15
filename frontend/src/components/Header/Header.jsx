import React from "react";
import { Logout } from "../index";
import { useDispatch, useSelector } from "react-redux";
import { setAccountSettings } from "../../store/slices/settings/settings.silce";

function Header() {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.userReducer);
  return (
    <div className="flex justify-between gap-4 bg-base-300 border-b border-b-gray-300 dark:border-b-gray-700">
      <div id="logo" className="flex items-center">
        <img
          src="https://res.cloudinary.com/dlzdikyzx/image/upload/v1747145592/image2_hdzmpj.png"
          alt="Logo"
          className="w-10 h-10 bg-transparent"
        />
        <h1 className="text-md font-semibold ">TalkNest</h1>
      </div>
      <div id="userProfile-settings" className="p-2 flex gap-2 items-center ">
        <p className=" max-w-30 md:max-w-40 lg:max-w-60 truncate">
          {userData?.username}
        </p>
        <button
          onMouseDown={() =>
            dispatch(setAccountSettings({ isAccountTabOpen: true }))
          }
          title="account"
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
