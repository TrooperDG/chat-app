import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user/user.slice.js";
import messageReducer from "./slices/message/message.slice.js";
import socketReducer from "./slices/socket/socket.slice.js";

export const store = configureStore({
  reducer: {
    userReducer,
    messageReducer,
    socketReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ["socketReducer.socket"],
      },
    }),
});
