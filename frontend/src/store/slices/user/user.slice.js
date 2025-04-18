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
  selectedUserData: null,
  userLoading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSelectedUser: (state, action) => {
      state.selectedUserData = action.payload;
    },
  },
  extraReducers: (builder) => {
    //Login Thunk
    builder.addCase(loginUserThunk.pending, (state, action) => {
      state.userLoading = true;
    });
    builder.addCase(loginUserThunk.fulfilled, (state, action) => {
      state.userData = action.payload.responseData;
      state.isAuthenticated = true;
      state.userLoading = false;
    });
    builder.addCase(loginUserThunk.rejected, (state, action) => {
      state.userLoading = false;
      console.log(" login-rejected", action.payload);
    });

    //Register Thunk
    builder.addCase(registerUserThunk.pending, (state, action) => {
      state.userLoading = true;
    });
    builder.addCase(registerUserThunk.fulfilled, (state, action) => {
      state.userData = action.payload.responseData;
      state.isAuthenticated = true;
      state.userLoading = false;
    });
    builder.addCase(registerUserThunk.rejected, (state, action) => {
      state.userLoading = false;
      console.log("register-rejected", action.payload);
    });

    //Logout Thunk
    builder.addCase(logoutUserThunk.pending, (state, action) => {
      state.userLoading = true;
    });
    builder.addCase(logoutUserThunk.fulfilled, (state, action) => {
      state.isAuthenticated = false;
      state.userData = null;
      state.otherUsersData = null;
      state.userLoading = false;
      console.log("L-Logged Out");
    });
    builder.addCase(logoutUserThunk.rejected, (state, action) => {
      state.userLoading = false;
      console.log("logout-rejected", action.payload);
    });

    //getUser Thunk
    builder.addCase(getUserThunk.pending, (state, action) => {
      state.userLoading = true;
    });
    builder.addCase(getUserThunk.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.userData = action.payload.responseData;
      state.userLoading = false;
    });
    builder.addCase(getUserThunk.rejected, (state, action) => {
      state.userLoading = false;
      console.log("get-user-rejected", action.payload);
    });

    //getOtherUsers Thunk
    builder.addCase(getOtherUsersThunk.pending, (state, action) => {
      state.userLoading = true;
    });
    builder.addCase(getOtherUsersThunk.fulfilled, (state, action) => {
      state.otherUsersData = action.payload.responseData;
      state.userLoading = false;
    });
    builder.addCase(getOtherUsersThunk.rejected, (state, action) => {
      state.userLoading = false;
      console.log("get-other-users-rejected", action.payload);
    });
  },
});

export const { setSelectedUser } = userSlice.actions;
export default userSlice.reducer;
