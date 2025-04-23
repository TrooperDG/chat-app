import React from "react";

// icons
import { MdOutlineColorLens } from "react-icons/md";
import { HiOutlineVolumeUp } from "react-icons/hi";
import { IoNotificationsOutline } from "react-icons/io5";

function SettingsTabs({ handleSelectTab, SelectedTab }) {
  const tabListClasses =
    "flex gap-1 items-center cursor-pointer p-2 rounded-sm hover:bg-gray-600 duration-100";
  return (
    <ul className="p-2 flex flex-col gap-1">
      <li
        id="theme"
        onClick={() => handleSelectTab("Theme")}
        className={` ${tabListClasses} ${
          SelectedTab === "Theme" && "bg-gray-700"
        }`}
      >
        <MdOutlineColorLens size={20} />
        <p className="">Theme</p>
      </li>
      <li
        id="sound"
        onClick={() => handleSelectTab("Sound")}
        className={`${tabListClasses} ${
          SelectedTab === "Sound" && "bg-gray-700"
        }`}
      >
        <HiOutlineVolumeUp size={20} />
        <p className="">Sound</p>
      </li>
      <li
        id="notification"
        onClick={() => handleSelectTab("Notification")}
        className={`${tabListClasses}  ${
          SelectedTab === "Notification" && "bg-gray-700"
        }`}
      >
        <IoNotificationsOutline size={20} />
        <p className="">Notification</p>
      </li>
    </ul>
  );
}

export default SettingsTabs;
