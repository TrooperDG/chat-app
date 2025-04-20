import { createSlice } from "@reduxjs/toolkit";
import { sendMessageThunk, getMessagesThunk } from "./message.thunk.js";

const initialState = {
  messages: null,
  // buttonLoading: false,
  messageLoading: false,
};

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    addNewMessage: (state, action) => {
      state.messages = [...state.messages, action.payload];
    },
  },
  extraReducers: (builder) => {
    //sendMessage Thunk
    builder.addCase(sendMessageThunk.pending, (state, action) => {
      state.messageLoading = true;
    });
    builder.addCase(sendMessageThunk.fulfilled, (state, action) => {
      state.messages = [
        ...state.messages,
        action.payload?.responseData?.newMessage,
      ];
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

export const { addNewMessage } = messageSlice.actions;
export default messageSlice.reducer;
