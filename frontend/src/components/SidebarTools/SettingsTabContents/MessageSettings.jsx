import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessageSettings } from "../../../store/slices/settings/settings.silce";

function MessageSettings() {
  const { messageSettings } = useSelector((state) => state.settingsReducer);

  const dispatch = useDispatch();

  const handleChangeMessageSettings = (e) => {
    if (e.target && e.target.checked !== undefined) {
      dispatch(
        setMessageSettings({
          ...messageSettings,
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
      <h1 className="text-xl font-semibold">Messages</h1>
      <div id="message-sound" className="mt-5 ">
        {/* <h3 className="mb-1 text-lg font-semibold">Sound</h3> */}
        <div className={toggleElemtclassess}>
          <span>Send sound</span>
          <input
            onChange={handleChangeMessageSettings}
            type="checkbox"
            name="sendSound"
            checked={messageSettings?.sendSound}
            className="ml-auto mt-1 toggle toggle-primary toggle-sm outline-primary-content hover:outline-2"
          />
          <span className=" ml-2 w-5">
            {messageSettings?.sendSound ? "on" : "off"}
          </span>
        </div>
        {/* <hr className="text-gray-700" /> */}
        <div className={toggleElemtclassess}>
          <span>Received sound</span>
          <input
            onChange={handleChangeMessageSettings}
            type="checkbox"
            name="receivedSound"
            checked={messageSettings?.receivedSound}
            className="ml-auto mt-1 toggle toggle-primary toggle-sm outline-primary-content hover:outline-2"
          />
          <span className=" ml-2 w-5">
            {messageSettings?.receivedSound ? "on" : "off"}
          </span>
        </div>
        {/* <hr className="text-gray-700" /> */}
        <div className={toggleElemtclassess}>
          <span>Seen sound</span>
          <input
            onChange={handleChangeMessageSettings}
            type="checkbox"
            name="seenSound"
            checked={messageSettings?.seenSound}
            className="ml-auto mt-1 toggle toggle-primary toggle-sm outline-primary-content hover:outline-2"
          />
          <span className=" ml-2 w-5">
            {messageSettings?.seenSound ? "on" : "off"}
          </span>
        </div>
      </div>
      {/* <hr className="text-gray-700 my-2" /> */}
    </div>
  );
}

export default MessageSettings;
