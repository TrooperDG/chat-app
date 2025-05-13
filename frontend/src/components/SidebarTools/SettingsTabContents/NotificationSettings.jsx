import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNotificationSettings } from "../../../store/slices/settings/settings.silce";

function NotificationSettings() {
  const { notificationSettings } = useSelector(
    (state) => state.settingsReducer
  );

  const dispatch = useDispatch();

  const handleChangeNotificationSettings = (e) => {
    if (e.target && e.target.checked !== undefined) {
      dispatch(
        setNotificationSettings({
          ...notificationSettings,
          [e.target.name]: e.target.checked,
        })
      );
    } else {
      //other settings that don't have boolean value
    }
  };

  const toggleElemtclassess =
    "flex items-center p-2 border-b border-gray-300 dark:border-gray-700 hover:bg-gray-300 dark:hover:bg-gray-700 duration-100 hover:rounded-sm";

  return (
    <div className="px-2.5 py-3 ">
      <h1 className="text-xl font-semibold">Notifications</h1>
      <div id="message-sound" className="mt-5 ">
        {/* <hr className="text-gray-700" /> */}
        <div className={toggleElemtclassess}>
          <span>Show Notification</span>
          <input
            onChange={handleChangeNotificationSettings}
            type="checkbox"
            name="showNotification"
            checked={notificationSettings?.showNotification}
            className="ml-auto mt-1 toggle toggle-primary toggle-sm outline-primary-content hover:outline-2"
          />
          <span className=" ml-2 w-5">
            {notificationSettings?.showNotification ? "on" : "off"}
          </span>
        </div>
        <div className={toggleElemtclassess}>
          <span>Notification Sound</span>
          <input
            onChange={handleChangeNotificationSettings}
            type="checkbox"
            name="notificationSound"
            disabled={!notificationSettings?.showNotification}
            checked={notificationSettings?.notificationSound}
            className="ml-auto mt-1 toggle toggle-primary toggle-sm outline-primary-content hover:outline-2"
          />
          <span className=" ml-2 w-5">
            {notificationSettings?.notificationSound ? "on" : "off"}
          </span>
        </div>
      </div>
      {/* <hr className="text-gray-700 my-2" /> */}
    </div>
  );
}

export default NotificationSettings;
