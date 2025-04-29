import { createSlice } from "@reduxjs/toolkit";
const htmlElement = document.querySelector("html");

const initialState = {
  messageSettings: JSON.parse(localStorage.getItem("messageSettings")) || {
    sendSound: true,
    receivedSound: true,
    seenSound: true,
  },

  themeSettings: JSON.parse(localStorage.getItem("themeSettings")) || {
    theme: "dark",
    //customization
  },

  notificationSettings: JSON.parse(
    localStorage.getItem("notificationSettings")
  ) || {
    notificationSound: true,
    showNotification: true,
  },
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setMessageSettings: (state, action) => {
      state.messageSettings = action.payload;
      localStorage.setItem("messageSettings", JSON.stringify(action.payload));
    },
    setThemeSettings: (state, action) => {
      state.themeSettings = action.payload;
      localStorage.setItem("themeSettings", JSON.stringify(action.payload));
    },
    setNotificationSettings: (state, action) => {
      state.notificationSettings = action.payload;
      localStorage.setItem(
        "notificationSettings",
        JSON.stringify(action.payload)
      );
    },
  },
});

export const { setMessageSettings, setThemeSettings, setNotificationSettings } =
  settingsSlice.actions;
export default settingsSlice.reducer;
