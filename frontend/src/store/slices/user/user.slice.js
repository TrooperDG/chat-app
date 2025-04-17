import { createSlice } from "@reduxjs/toolkit";
import {
  loginUserThunk,
  registerUserThunk,
  logoutUserThunk,
  getUserThunk,
  getOtherUsersThunk,
} from "./user.thunk.js";

const initialState = {
  isAuthenticated: false,
  userData: null,
  otherUsersData: null,
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
      state.userData = action.payload.responseData;
      state.isAuthenticated = true;
      console.log(state.userData);
    });
    builder.addCase(loginUserThunk.rejected, (state, action) => {
      console.log("rejected", action.payload);
    });

    //Register Thunk
    builder.addCase(registerUserThunk.pending, (state, action) => {
      console.log("R-pending");
    });
    builder.addCase(registerUserThunk.fulfilled, (state, action) => {
      state.userData = action.payload.responseData;
      state.isAuthenticated = true;
      console.log(state.userData);
    });
    builder.addCase(registerUserThunk.rejected, (state, action) => {
      console.log("R-rejected", action.payload);
    });

    //Logout Thunk
    builder.addCase(logoutUserThunk.pending, (state, action) => {
      console.log("L-pending");
    });
    builder.addCase(logoutUserThunk.fulfilled, (state, action) => {
      state.isAuthenticated = false;
      state.userData = null;
      state.otherUsersData = null;
      console.log("L-Logged Out");
    });
    builder.addCase(logoutUserThunk.rejected, (state, action) => {
      console.log("L-rejected", action.payload);
    });

    //getUser Thunk
    builder.addCase(getUserThunk.pending, (state, action) => {
      console.log("G-pending");
    });
    builder.addCase(getUserThunk.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.userData = action.payload.responseData;
      console.log(state.userData);
    });
    builder.addCase(getUserThunk.rejected, (state, action) => {
      console.log("G-rejected", action.payload);
    });

    //getOtherUsers Thunk
    builder.addCase(getOtherUsersThunk.pending, (state, action) => {
      console.log("O-pending");
    });
    builder.addCase(getOtherUsersThunk.fulfilled, (state, action) => {
      state.otherUsersData = action.payload.responseData;
      console.log(state.otherUsersData);
    });
    builder.addCase(getOtherUsersThunk.rejected, (state, action) => {
      console.log("O-rejected");
    });
  },
});

export const { Login } = userSlice.actions;
export default userSlice.reducer;
