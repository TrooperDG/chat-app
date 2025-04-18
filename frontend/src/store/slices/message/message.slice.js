import { createSlice } from "@reduxjs/toolkit";
import { sendMessageThunk, getMessagesThunk } from "./message.thunk.js";

const initialState = {
  messages: null,
  // buttonLoading: false,
  messageLoading: false,
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
      state.messageLoading = true;
    });
    builder.addCase(sendMessageThunk.fulfilled, (state, action) => {
      state.messages =
        action.payload?.responseData?.conversation?.messages || null;
      state.messageLoading = false;
    });
    builder.addCase(sendMessageThunk.rejected, (state, action) => {
      state.messageLoading = false;
      console.log("send-message-rejected", action.payload);
    });

    //getMessages thunk
    builder.addCase(getMessagesThunk.pending, (state, action) => {
      state.messageLoading = true;
    });
    builder.addCase(getMessagesThunk.fulfilled, (state, action) => {
      state.messages = action.payload?.responseData?.messages;
      state.messageLoading = false;
    });
    builder.addCase(getMessagesThunk.rejected, (state, action) => {
      state.messageLoading = false;
      console.log("get-messages-rejected", action.payload);
    });
  },
});

export const {} = messageSlice.actions;
export default messageSlice.reducer;
