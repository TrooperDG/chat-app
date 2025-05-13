import React, { useEffect, useRef, useState } from "react";
import SettingsTabs from "./SettingsTabs";
import ThemeSettings from "./SettingsTabContents/ThemeSettings";
import MessageSettings from "./SettingsTabContents/MessageSettings";
import NotificationSettings from "./SettingsTabContents/NotificationSettings";
import Account from "./SettingsTabContents/Account";
import { useDispatch, useSelector } from "react-redux";

//icons-----------------------------------
import { RxCross2 } from "react-icons/rx";

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

  // for mobile view ---------------------------------------------------------
  const { isMobile } = useSelector(
    (state) => state.settingsReducer?.UISettings
  );
  const [showSelectedTab, setShowSelectedTab] = useState(true);
  const [showTabs, setShowTabs] = useState(true);

  useEffect(() => {
    if (isMobile) {
      if (SelectedTab) {
        setShowTabs(false);
        setShowSelectedTab(true);
      } else {
        setShowSelectedTab(false);
        setShowTabs(true);
      }
    } else {
      setShowTabs(true);
      setShowSelectedTab(true);
    }
  }, [isMobile, SelectedTab]);

  //--------------------------------------------------------------------------

  return (
    <div
      ref={settingsWindowRef}
      id="settings-window"
      className={`  ${
        isMobile
          ? " fixed inset-0 bg-base-100"
          : " absolute bottom-3 left-15 h-3/4 max-h-120 w-120 bg-base-300 "
      }  rounded-md  flex border border-gray-300 dark:border-gray-700 z-20`}
    >
      {showTabs && (
        <div
          id="tabs"
          className={`${
            isMobile ? "w-full" : "w-2/5"
          } border-r border-r-gray-300 dark:border-r-gray-700 overflow-y-scroll `}
        >
          {isMobile && (
            <div className="w-full px-4 flex justify-between items-center mt-4">
              <h2 className="text-xl font-semibold">Settings</h2>
              <button
                onClick={() => handleClose()}
                className=" btn btn-square btn-soft"
              >
                <RxCross2 size={22} />
              </button>
            </div>
          )}
          <SettingsTabs
            handleSelectTab={(name) => setSelectedTab(name)}
            SelectedTab={SelectedTab}
          />
        </div>
      )}
      {showSelectedTab && (
        <div
          id="settings"
          className={`px-2 ${isMobile ? "w-full py-4" : "w-3/5"}`}
        >
          {isMobile && (
            <button
              onClick={() => setSelectedTab(null)}
              className=" absolute right-4 top-4 btn btn-square btn-soft"
            >
              <RxCross2 size={22} />
            </button>
          )}
          {SelectedTab === "Theme" && <ThemeSettings />}
          {SelectedTab === "Messages" && <MessageSettings />}
          {SelectedTab === "Notifications" && <NotificationSettings />}
          {SelectedTab === "Account" && <Account />}
        </div>
      )}
    </div>
  );
}

export default SettingsWindow;
