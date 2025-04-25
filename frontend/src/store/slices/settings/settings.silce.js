import { createSlice } from "@reduxjs/toolkit";
const htmlElement = document.querySelector("html");

const initialState = {
  // sound: JSON.parse(localStorage.getItem("sound")) || {
  //   sendMessage: true,
  //   receiveMessage: true,
  //   notification: true,
  //   seenMessage: true,
  // },

  messageSettings: JSON.parse(localStorage.getItem("messageSettings")) || {
    sendSound: true,
    receivedSound: true,
    seenSound: true,
  },
  themeSettings: JSON.parse(localStorage.getItem("themeSettings")) || {
    theme: "dark",
    //customization
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
  },
});

export const { setMessageSettings, setThemeSettings } = settingsSlice.actions;
export default settingsSlice.reducer;
