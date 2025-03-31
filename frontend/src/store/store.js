import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/auth.slice";

export const store = configureStore({
  reducer: { userReducer },
});
