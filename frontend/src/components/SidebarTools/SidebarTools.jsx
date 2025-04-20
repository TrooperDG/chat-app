import React from "react";
import { MdOutlineSettings } from "react-icons/md";
import { LuUsers } from "react-icons/lu";

function SidebarTools({ handleOpenUserSidebar, isUsersSidebarOpen }) {
  return (
    <div className="flex flex-col items-center justify-between border-r border-r-gray-300 dark:border-r-gray-700 gap-2 p-1">
      <div id="top">
        <button
          onClick={handleOpenUserSidebar}
          className={` w-10 h-10 flex justify-center items-center hover:bg-gray-400 dark:hover:bg-gray-600 duration-100 rounded-sm border-b-2 border-base-100 ${
            isUsersSidebarOpen && " border-primary bg-gray-400 dark:bg-gray-700"
          }`}
        >
          <LuUsers size={22} className={`text-gray-700 dark:text-gray-300 `} />
        </button>
      </div>

      <div id="bottom">
        <button className=" w-10 h-10 flex justify-center items-center hover:bg-gray-300 dark:hover:bg-gray-700 duration-100 rounded-sm">
          <MdOutlineSettings
            size={22}
            className="text-gray-700 dark:text-gray-300"
          />
        </button>
      </div>
    </div>
  );
}

export default SidebarTools;
