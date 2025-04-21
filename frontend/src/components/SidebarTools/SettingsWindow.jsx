import React, { useRef, useState } from "react";
import SettingsTabs from "./SettingsTabs";
import ThemeSettings from "./SettingsTabContents/ThemeSettings";
import SoundSettings from "./SettingsTabContents/SoundSettings";
import NotificationSettings from "./SettingsTabContents/NotificationSettings";

function SettingsWindow({ handleClose }) {
  const [SelectedTab, setSelectedTab] = useState(null);
  const settingsWindowRef = useRef(null);

  document.addEventListener("mousedown", (e) => {
    if (
      settingsWindowRef.current &&
      !settingsWindowRef.current.contains(e.target)
    ) {
      handleClose();
    }
  });

  return (
    <div
      ref={settingsWindowRef}
      id="settings-window"
      className=" absolute bottom-3 left-15 rounded-md h-3/4 max-h-120 w-120 bg-base-300 flex border border-gray-300 dark:border-gray-700 z-20"
    >
      <div
        id="tabs"
        className="w-2/5 border-r border-r-gray-300 dark:border-r-gray-700 "
      >
        <SettingsTabs
          handleSelectTab={(name) => setSelectedTab(name)}
          SelectedTab={SelectedTab}
        />
      </div>
      <div id="settings" className="px-2 ">
        {SelectedTab === "Theme" && <ThemeSettings />}
        {SelectedTab === "Sound" && <SoundSettings />}
        {SelectedTab === "Notification" && <NotificationSettings />}
      </div>
    </div>
  );
}

export default SettingsWindow;
