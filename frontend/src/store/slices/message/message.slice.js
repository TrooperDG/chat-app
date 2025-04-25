import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

import {
  sendMessageThunk,
  getMessagesThunk,
  seenMessagesThunk,
} from "./message.thunk.js";

const initialState = {
  // messagesArray: [], // object:{otherUser_id & conversation between us}
  messages: null,
  // buttonLoading: false,
  // isSeen: false,
  messageLoading: false,
  // newMessage: null,
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
    updateMessagesAfterSeen: (state, action) => {
      //after the messages sent by the sender are seen by the receiver ::  then set isSeen:true
      //payload = myId if my msgs are seen :/or/: otherGuy Id if i've seen his messages
      if (state.messages) {
        const updatedMesages = state.messages.map((message) =>
          message.senderId === action.payload
            ? { ...message, isSeen: true }
            : message
        );
        state.messages = updatedMesages;
      }
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
      console.log("get-messages-rejected", action.payload);
    });
  },
});

export const { addNewMessage, updateMessagesAfterSeen } = messageSlice.actions;
export default messageSlice.reducer;
