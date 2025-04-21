import React from "react";

function SettingsTabs({ handleSelectTab, SelectedTab }) {
  const tabListClasses =
    "cursor-pointer p-2 rounded-sm hover:bg-gray-600 duration-100";
  return (
    <ul className="p-2 flex flex-col gap-1">
      <li
        onClick={() => handleSelectTab("Theme")}
        className={` ${tabListClasses} ${
          SelectedTab === "Theme" && "bg-gray-700"
        }`}
      >
        <p className="">Theme</p>
      </li>
      <li
        onClick={() => handleSelectTab("Sound")}
        className={`${tabListClasses} ${
          SelectedTab === "Sound" && "bg-gray-700"
        }`}
      >
        <p className="">Sound</p>
      </li>
      <li
        onClick={() => handleSelectTab("Notification")}
        className={`${tabListClasses}  ${
          SelectedTab === "Notification" && "bg-gray-700"
        }`}
      >
        <p className="">Notification</p>
      </li>
    </ul>
  );
}

export default SettingsTabs;
