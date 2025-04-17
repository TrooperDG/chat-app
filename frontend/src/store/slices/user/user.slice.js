import { createSlice } from "@reduxjs/toolkit";
import {
  loginUserThunk,
  registerUserThunk,
  logoutUserThunk,
  getUserThunk,
} from "./user.thunk.js";

const initialState = {
  isAuthenticated: false,
  userData: {},
  buttonLoading: false,
  screenLoading: false,
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
    //Login Thunk
    builder.addCase(loginUserThunk.pending, (state, action) => {
      console.log("pending");
      // state.buttonLoading = true;
    });
    builder.addCase(loginUserThunk.fulfilled, (state, action) => {
      console.log("fulfilled");
      state.isAuthenticated = true;
    });
    builder.addCase(loginUserThunk.rejected, (state, action) => {
      console.log("rejected");
      // state.buttonLoading = false;
    });

    //Register Thunk
    builder.addCase(registerUserThunk.pending, (state, action) => {
      console.log("R-pending");
    });
    builder.addCase(registerUserThunk.fulfilled, (state, action) => {
      console.log("R-fulfilled");
      state.isAuthenticated = true;
    });
    builder.addCase(registerUserThunk.rejected, (state, action) => {
      console.log("R-rejected");
    });

    //Logout Thunk
    builder.addCase(logoutUserThunk.pending, (state, action) => {
      console.log("L-pending");
    });
    builder.addCase(logoutUserThunk.fulfilled, (state, action) => {
      console.log("L-fulfilled");
      state.isAuthenticated = false;
    });
    builder.addCase(logoutUserThunk.rejected, (state, action) => {
      console.log("L-rejected");
    });

    //getUser Thunk
    builder.addCase(getUserThunk.pending, (state, action) => {
      console.log("G-pending");
    });
    builder.addCase(getUserThunk.fulfilled, (state, action) => {
      console.log("G-fulfilled");
      state.isAuthenticated = true;
    });
    builder.addCase(getUserThunk.rejected, (state, action) => {
      console.log("G-rejected");
    });
  },
});

export const { Login } = userSlice.actions;
export default userSlice.reducer;
