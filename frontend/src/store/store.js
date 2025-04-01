import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user/user.slice";

export const store = configureStore({
  reducer: { userReducer },
});
