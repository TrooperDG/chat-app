import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSound } from "../../../store/slices/settings/settings.silce";

function SoundSettings() {
  const { sound } = useSelector((state) => state.settingsReducer);

  const dispatch = useDispatch();

  const handleChangeSound = (e) => {
    dispatch(
      setSound({
        ...sound,
        [e.target.name]: e.target.checked,
      })
    );
  };

  return (
    <div className="px-2.5 py-3 ">
      <h1 className="text-xl ">Sound Settings</h1>
      <div className="mt-3">
        <div className="flex p-2 hover:bg-gray-700 duration-100 rounded-sm">
          <span>Message send</span>
          <input
            onChange={handleChangeSound}
            type="checkbox"
            name="sendMessage"
            checked={sound.sendMessage}
            className="ml-auto mt-1 toggle toggle-primary toggle-sm outline-primary-content hover:outline-2"
          />
          <span className=" ml-2 w-5">{sound.sendMessage ? "on" : "off"}</span>
        </div>
        <div className="flex p-2 hover:bg-gray-700 duration-100 rounded-sm">
          <span>Message receive</span>
          <input
            onChange={handleChangeSound}
            type="checkbox"
            name="receiveMessage"
            checked={sound.receiveMessage}
            className="ml-auto mt-1 toggle toggle-primary toggle-sm outline-primary-content hover:outline-2"
          />
          <span className=" ml-2 w-5">
            {sound.receiveMessage ? "on" : "off"}
          </span>
        </div>
        <div className="flex p-2 hover:bg-gray-700 duration-100 rounded-sm">
          <span>Message seen</span>
          <input
            onChange={handleChangeSound}
            type="checkbox"
            name="seenMessage"
            checked={sound.seenMessage}
            className="ml-auto mt-1 toggle toggle-primary toggle-sm outline-primary-content hover:outline-2"
          />
          <span className=" ml-2 w-5">{sound.seenMessage ? "on" : "off"}</span>
        </div>
        <div className="flex p-2 hover:bg-gray-700 duration-100 rounded-sm">
          <span>Notification</span>
          <input
            onChange={handleChangeSound}
            type="checkbox"
            name="notification"
            checked={sound.notification}
            className="ml-auto mt-1 toggle toggle-primary toggle-sm outline-primary-content hover:outline-2"
          />
          <span className=" ml-2 w-5">{sound.notification ? "on" : "off"}</span>
        </div>
      </div>
    </div>
  );
}

export default SoundSettings;
