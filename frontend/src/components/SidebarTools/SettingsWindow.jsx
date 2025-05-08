import React, { useEffect, useRef, useState } from "react";
import SettingsTabs from "./SettingsTabs";
import ThemeSettings from "./SettingsTabContents/ThemeSettings";
import MessageSettings from "./SettingsTabContents/MessageSettings";
import NotificationSettings from "./SettingsTabContents/NotificationSettings";
import Account from "./SettingsTabContents/Account";
import { useDispatch, useSelector } from "react-redux";

function SettingsWindow({ settingsButtonRef, handleClose }) {
  const { isAccountTabOpen } = useSelector(
    (state) => state.settingsReducer?.accountSettings
  );

  const [SelectedTab, setSelectedTab] = useState(null);
  const settingsWindowRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      //using settingsButtonRef  so that is does not reopen when this runs
      if (
        settingsWindowRef.current &&
        !settingsWindowRef.current.contains(e.target) &&
        !settingsButtonRef.current.contains(e.target)
      ) {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // this use Effect to open the account tab from the top right corner user logo
  useEffect(() => {
    if (isAccountTabOpen) setSelectedTab("Account");
  }, [isAccountTabOpen]);

  return (
    <div
      ref={settingsWindowRef}
      id="settings-window"
      className=" absolute bottom-3 left-15 rounded-md h-3/4 max-h-120 w-120 bg-base-300 flex border border-gray-300 dark:border-gray-700 z-20"
    >
      <div
        id="tabs"
        className="w-2/5 border-r border-r-gray-300 dark:border-r-gray-700 overflow-y-scroll "
      >
        <SettingsTabs
          handleSelectTab={(name) => setSelectedTab(name)}
          SelectedTab={SelectedTab}
        />
      </div>
      <div id="settings" className="px-2 w-3/5">
        {SelectedTab === "Theme" && <ThemeSettings />}
        {SelectedTab === "Messages" && <MessageSettings />}
        {SelectedTab === "Notifications" && <NotificationSettings />}
        {SelectedTab === "Account" && <Account />}
      </div>
    </div>
  );
}

export default SettingsWindow;
