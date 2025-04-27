import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

import {
  sendMessageThunk,
  getMessagesThunk,
  seenMessagesThunk,
} from "./message.thunk.js";

const initialState = {
  messages: [],
  messageLoading: false,
};

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    // for socket
    addNewMessage: (state, action) => {
      if (state.messages) {
        state.messages = [...state.messages, action.payload];
      } else {
        state.messages = [action.payload];
      }
    },
    myMessagesAreSeen: (state, action) => {
      state.messages = state.messages.map((message) =>
        message.senderId === action.payload.myId
          ? { ...message, isSeen: true }
          : message
      );
    },
    otherParticipantMessagesAreSeen: (state, action) => {
      state.messages = state.messages.map((message) =>
        message.senderId === action.payload.otherParticipantId
          ? { ...message, isSeen: true }
          : message
      );
    },
  },
  extraReducers: (builder) => {
    //sendMessage Thunk
    builder.addCase(sendMessageThunk.pending, (state, action) => {
      state.messageLoading = true;
    });
    builder.addCase(sendMessageThunk.fulfilled, (state, action) => {
      if (state.messages) {
        state.messages = [
          ...state.messages,
          action.payload?.responseData?.newMessage,
        ];
      } else {
        state.messages = [action.payload?.responseData?.newMessage];
      }

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

    //seenMessages thunk
    builder.addCase(seenMessagesThunk.pending, (state, action) => {
      state.messageLoading = true;
    });
    builder.addCase(seenMessagesThunk.fulfilled, (state, action) => {
      state.messageLoading = false;
    });
    builder.addCase(seenMessagesThunk.rejected, (state, action) => {
      state.messageLoading = false;
      console.log("seen-messages-rejected", action.payload);
    });
  },
});

export const {
  addNewMessage,
  updateMessagesAfterSeen,
  myMessagesAreSeen,
  addNewNotification,
  otherParticipantMessagesAreSeen,
} = messageSlice.actions;
export default messageSlice.reducer;
