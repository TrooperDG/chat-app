import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setThemeSettings } from "../../../store/slices/settings/settings.silce";

function ThemeSettings() {
  const { themeSettings } = useSelector((state) => state.settingsReducer);
  const dispatch = useDispatch();

  const handleChangeTheme = (e) => {
    dispatch(setThemeSettings({ theme: e.target.value }));
  };

  return (
    <div className="px-2.5 py-3  w-full ">
      <h1 className="text-xl ">Theme Settings</h1>
      <div className="mt-3 p-2">
        <p>Change Theme</p>
        <select
          onChange={handleChangeTheme}
          defaultValue={themeSettings.theme}
          className="bg-gray-700  mt-2.5 select select-ghost select-s h-7 w-28 "
        >
          <option value={"dark"} className="bg-gray-700 ">
            Dark
          </option>
          <option value={"light"} className="bg-gray-700 ">
            Light
          </option>
        </select>
      </div>
    </div>
  );
}

export default ThemeSettings;
