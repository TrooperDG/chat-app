import { createSlice } from "@reduxjs/toolkit";
import { sendMessageThunk, getMessagesThunk } from "./message.thunk.js";

const initialState = {
  messages: null,
  // buttonLoading: false,
  screenLoading: false,
};

export const messageSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // setSelectedUser: (state, action) => {
    //   state.selectedUserData = action.payload;
    //   console.log(state.selectedUserData);
    // },
  },
  extraReducers: (builder) => {
    //sendMessage Thunk
    builder.addCase(sendMessageThunk.pending, (state, action) => {
      console.log("m-pending");
      // state.buttonLoading = true;
    });
    builder.addCase(sendMessageThunk.fulfilled, (state, action) => {
      state.messages = action.payload?.responseData?.conversation?.messages;
      console.log(
        "m-fullfiled",
        action.payload?.responseData?.conversation?.messages
      );
    });
    builder.addCase(sendMessageThunk.rejected, (state, action) => {
      console.log("m-rejected");
    });

    //getMessages thunk
    builder.addCase(getMessagesThunk.pending, (state, action) => {
      console.log("gm-pending");
      // state.buttonLoading = true;
    });
    builder.addCase(getMessagesThunk.fulfilled, (state, action) => {
      state.messages = action.payload?.responseData?.messages;
      console.log("gm-fullfiled", action.payload?.responseData?.messages);
    });
    builder.addCase(getMessagesThunk.rejected, (state, action) => {
      console.log("m-rejected");
    });
  },
});

export const {} = messageSlice.actions;
export default messageSlice.reducer;
