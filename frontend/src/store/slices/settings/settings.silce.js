import { createSlice } from "@reduxjs/toolkit";

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

  accountSettings: {
    isAccountTabOpen: false,
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
    setAccountSettings: (state, action) => {
      state.accountSettings.isAccountTabOpen = action.payload?.isAccountTabOpen;
    },
  },
});

export const {
  setMessageSettings,
  setThemeSettings,
  setNotificationSettings,
  setAccountSettings,
} = settingsSlice.actions;
export default settingsSlice.reducer;
