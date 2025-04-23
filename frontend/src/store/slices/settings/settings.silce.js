import { createSlice } from "@reduxjs/toolkit";
const htmlElement = document.querySelector("html");

const initialState = {
  sound: {
    message: true,
    notification: false,
  },
  theme: JSON.parse(localStorage.getItem("theme")) || "dark",
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setSound: (state, action) => {
      state.sound = action.payload;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
      localStorage.setItem("theme", JSON.stringify(action.payload));
    },
  },
});

export const { setSound, setTheme } = settingsSlice.actions;
export default settingsSlice.reducer;
