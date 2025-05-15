import React, { useEffect, useRef, useState } from "react";
import { MdOutlineSettings } from "react-icons/md";
import { LuUsers } from "react-icons/lu";
import { BsChatLeftText } from "react-icons/bs";
import SettingsWindow from "./SettingsWindow";
import { useDispatch, useSelector } from "react-redux";
import { setAccountSettings } from "../../store/slices/settings/settings.silce";

import { AnimatePresence } from "framer-motion";

function SidebarTools({
  option,
  isUsersSidebarOpen,
  handleOpenUserSidebar,
  setUserSideBarOption,
}) {
  const [isSettingsWindowOpen, setIsSettingsWindowOpen] = useState(false);
  const settingsButtonRef = useRef(null);

  const { isAccountTabOpen } = useSelector(
    (state) => state.settingsReducer?.accountSettings
  );
  const dispatch = useDispatch();

  // this use Effect to open the SettingsWindow  from the top right corner user logo
  useEffect(() => {
    if (isAccountTabOpen) setIsSettingsWindowOpen(true);
  }, [isAccountTabOpen]);
  return (
    <div className="relative flex flex-col items-center justify-between border-r border-r-gray-300 dark:border-r-gray-700 gap-2 p-1 ">
      <div id="top" className="flex flex-col gap-1">
        <button
          onClick={() => {
            handleOpenUserSidebar();
            setUserSideBarOption("All");
          }}
          className={` w-10 h-10 flex justify-center items-center hover:bg-gray-300 dark:hover:bg-gray-600 duration-100 rounded-sm border-b-2 border-base-100 ${
            isUsersSidebarOpen &&
            option === "All" &&
            " border-primary bg-gray-300 dark:bg-gray-700"
          }`}
        >
          <LuUsers size={22} className={`text-gray-600 dark:text-gray-400 `} />
        </button>
        <button
          onClick={() => {
            handleOpenUserSidebar();
            setUserSideBarOption("Chats");
          }}
          className={` w-10 h-10 flex justify-center items-center hover:bg-gray-300 dark:hover:bg-gray-600 duration-100 rounded-sm border-b-2 border-base-100 ${
            isUsersSidebarOpen &&
            option === "Chats" &&
            " border-primary bg-gray-300 dark:bg-gray-700"
          }`}
        >
          <BsChatLeftText
            size={22}
            className={`text-gray-600 dark:text-gray-400 `}
          />
        </button>
      </div>

      {/* for settings windowww -------------- */}

      <div id="bottom">
        <button
          ref={settingsButtonRef}
          onClick={() => {
            setIsSettingsWindowOpen((prev) => !prev);
            isSettingsWindowOpen &&
              dispatch(setAccountSettings({ isAccountTabOpen: false }));
          }}
          className=" w-10 h-10 flex justify-center items-center hover:bg-gray-300 dark:hover:bg-gray-700 duration-100 rounded-sm"
        >
          <MdOutlineSettings
            size={22}
            className="text-gray-600 dark:text-gray-400"
          />
        </button>
      </div>

      {/* fixed window */}
      <AnimatePresence>
        {isSettingsWindowOpen && (
          <SettingsWindow
            settingsButtonRef={settingsButtonRef}
            handleClose={() => {
              setIsSettingsWindowOpen(false);
              dispatch(setAccountSettings({ isAccountTabOpen: false }));
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default SidebarTools;
