import { createSlice } from "@reduxjs/toolkit";
import { loginUserThunk } from "./user.thunk";

const initialState = {
  isAuthenticated: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    Login: (state, action) => {
      console.log("hellow reducer");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUserThunk.pending, (state, action) => {
      console.log("pending");
    });
    builder.addCase(loginUserThunk.fulfilled, (state, action) => {
      console.log("fulfilled");
    });
    builder.addCase(loginUserThunk.rejected, (state, action) => {
      console.log("rejected");
    });
  },
});

export const { Login } = userSlice.actions;
export default userSlice.reducer;
