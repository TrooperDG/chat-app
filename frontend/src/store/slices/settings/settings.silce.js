import { createSlice } from "@reduxjs/toolkit";
const htmlElement = document.querySelector("html");

const initialState = {
  sound: JSON.parse(localStorage.getItem("sound")) || {
    sendMessage: true,
    receiveMessage: true,
    notification: true,
    seenMessage: true,
  },
  theme: JSON.parse(localStorage.getItem("theme")) || "dark",
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setSound: (state, action) => {
      state.sound = action.payload;
      localStorage.setItem("sound", JSON.stringify(action.payload));
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
      localStorage.setItem("theme", JSON.stringify(action.payload));
    },
  },
});

export const { setSound, setTheme } = settingsSlice.actions;
export default settingsSlice.reducer;
