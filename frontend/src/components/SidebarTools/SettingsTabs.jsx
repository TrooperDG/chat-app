import React from "react";

// icons
import { MdOutlineColorLens } from "react-icons/md";
import { IoChatbubblesOutline } from "react-icons/io5";
import { IoNotificationsOutline } from "react-icons/io5";

function SettingsTabs({ handleSelectTab, SelectedTab }) {
  const tabListClasses =
    "flex gap-2 items-center cursor-pointer p-2 rounded-sm hover:bg-gray-600 duration-100";
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
        id="messages"
        onClick={() => handleSelectTab("Messages")}
        className={`${tabListClasses} ${
          SelectedTab === "Messages" && "bg-gray-700"
        }`}
      >
        <IoChatbubblesOutline size={20} />
        <p className="">Messages</p>
      </li>
      <li
        id="notifications"
        onClick={() => handleSelectTab("Notifications")}
        className={`${tabListClasses}  ${
          SelectedTab === "Notification" && "bg-gray-700"
        }`}
      >
        <IoNotificationsOutline size={20} />
        <p className="">Notifications</p>
      </li>
    </ul>
  );
}

export default SettingsTabs;
