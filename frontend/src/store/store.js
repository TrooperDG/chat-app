import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user/user.slice.js";
import messageReducer from "./slices/message/message.slice.js";
import socketReducer from "./slices/socket/socket.slice.js";
import settingsReducer from "./slices/settings/settings.silce.js";

export const store = configureStore({
  reducer: {
    userReducer,
    messageReducer,
    socketReducer,
    settingsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ["socketReducer.socket"],
      },
    }),
});
