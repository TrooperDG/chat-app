import { createSlice } from "@reduxjs/toolkit";
import {
  loginUserThunk,
  registerUserThunk,
  logoutUserThunk,
  getUserThunk,
  updateUserThunk,
  updateUserAvatarThunk,
  getOtherUsersThunk,
  getAllLatestUserMessagesThunk,
} from "./user.thunk.js";

const initialState = {
  isAuthenticated: false,
  userData: [],
  otherUsersData: [],
  selectedUserData: JSON.parse(localStorage.getItem("selectedUserData")),
  userLoading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSelectedUser: (state, action) => {
      state.selectedUserData = action.payload;
      localStorage.setItem("selectedUserData", JSON.stringify(action.payload));
    },
    moveNewNotificationSenderToTop: (state, action) => {
      const index = state.otherUsersData.findIndex(
        (user) =>
          user._id === action.payload.message.senderId ||
          user._id === action.payload.message.receiverId // {senderId} when new msg received , and {receiverId} when i send a new msg
      );
      if (index !== -1) {
        const [user] = state.otherUsersData.splice(index, 1);
        state.otherUsersData.unshift({
          ...user,
          latestMessage: action.payload.message,
        });
      }
    },
    seenMessageAtUserSideBar: (state, action) => {
      const user = state.otherUsersData.find(
        (user) => user._id === action.payload.otherParticipantId
      );
      if (user) {
        if (user && user.latestMessage) {
          user.latestMessage.isSeen = true;
        }
      }
    },

    addUnseenMessageCount: (state, action) => {
      const user = state.otherUsersData.find(
        (user) => user._id === action.payload.otherUserId
      );
      if (user) {
        if (user && user.unseenMesageCount !== undefined) {
          user.unseenMesageCount = user.unseenMesageCount + 1;
        }
      }
    },
    removeUnseenMessageCount: (state, action) => {
      const user = state.otherUsersData.find(
        (user) => user._id === action.payload.otherUserId
      );
      if (user) {
        if (user && user.unseenMesageCount !== undefined) {
          // user?.unseenMesageCount = 0;
          user.unseenMesageCount = 0;
        }
      }
    },
    setLastSeenAfterUserGoesOffline: (state, action) => {
      const user = state.otherUsersData.find(
        (user) => user._id === action.payload.userId
      );
      if (user) {
        if (user && user.lastSeen) {
          // user?.unseenMesageCount = 0;
          user.lastSeen = new Date().toISOString();
        }
      }
    },
  },
  extraReducers: (builder) => {
    //Login Thunk
    builder.addCase(loginUserThunk.pending, (state, action) => {
      state.userLoading = true;
    });
    builder.addCase(loginUserThunk.fulfilled, (state, action) => {
      state.userData = action.payload.responseData.user;
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
      state.userData = action.payload.responseData.user;

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
      state.selectedUserData = null;
      localStorage.clear(); // clear selectedUserData
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

    //updateUser Thunk
    builder.addCase(updateUserThunk.pending, (state, action) => {
      state.userLoading = true;
    });
    builder.addCase(updateUserThunk.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.userData = action.payload; //! need to change other builders with only payload
      state.userLoading = false;
    });
    builder.addCase(updateUserThunk.rejected, (state, action) => {
      state.userLoading = false;
      console.log("get-user-rejected", action.payload);
    });

    //updateUserAvatar Thunk
    builder.addCase(updateUserAvatarThunk.pending, (state, action) => {
      state.userLoading = true;
    });
    builder.addCase(updateUserAvatarThunk.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.userData.avatar = action.payload; //! need to change other builders with only payload
      state.userLoading = false;
    });
    builder.addCase(updateUserAvatarThunk.rejected, (state, action) => {
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
    //getOtherUsers Thunk
    builder.addCase(getAllLatestUserMessagesThunk.pending, (state, action) => {
      state.userLoading = true;
    });
    builder.addCase(
      getAllLatestUserMessagesThunk.fulfilled,
      (state, action) => {
        if (state.otherUsersData?.length <= 0) return;

        // for  unseen message count in userSIdeBar
        const unseenIncomingMessages =
          action.payload?.responseData?.unseenIncomingMessages;

        // setting the latest message
        const latestMessages = action.payload?.responseData?.latestMessages;

        if (latestMessages?.length > 0) {
          const newOtherUsersData = state.otherUsersData.map((user) => {
            const latestMessage = latestMessages.find(
              (message) =>
                message.senderId === user._id || message.receiverId === user._id
            );

            let unseenMesageCount = 0;
            if (latestMessage) {
              unseenIncomingMessages.forEach((message) => {
                message?.senderId === user._id && unseenMesageCount++;
              });

              return {
                ...user,
                latestMessage: latestMessage,
                unseenMesageCount,
              };
            }
            return { ...user, latestMessage: null, unseenMesageCount };
          });
          state.otherUsersData = newOtherUsersData;
        }

        // unseenIncomingMessages.forEach((message) => {
        //   const user = state.otherUsersData.find(
        //     (user) => user._id === message.senderId
        //   );
        //   if (user) {
        //     user = {
        //       ...user,
        //       unseenMesageCount: user.unseenMesageCount
        //         ? user.unseenMesageCount + 1
        //         : 1,
        //     };
        //   }
        // });

        // console.log(unseenIncomingMessages);

        state.userLoading = false;
      }
    );
    builder.addCase(getAllLatestUserMessagesThunk.rejected, (state, action) => {
      state.userLoading = false;
      console.log("get-all-latest-user-messages-rejected", action.payload);
    });
  },
});

export const {
  setSelectedUser,
  moveNewNotificationSenderToTop,
  seenMessageAtUserSideBar,
  addUnseenMessageCount,
  removeUnseenMessageCount,
  setLastSeenAfterUserGoesOffline,
} = userSlice.actions;
export default userSlice.reducer;
