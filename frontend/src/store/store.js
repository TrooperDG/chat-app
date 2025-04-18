import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user/user.slice.js";
import messageReducer from "./slices/message/message.slice.js";

export const store = configureStore({
  reducer: {
    userReducer,
    messageReducer,
  },
});
