import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../components/utilities/axios.utility.js";

const sendMessageThunk = createAsyncThunk(
  "message/send",
  async ({ receiverId, message }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/message/send/${receiverId}`, {
        message,
      });
      return response?.data || null;
    } catch (error) {
      console.log("MSGerror", error);
      const errMessage = error?.response?.data?.errorMessage;
      return rejectWithValue(errMessage || "something went wrong");
    }
  }
);
const getMessagesThunk = createAsyncThunk(
  "message/getMessages",
  async ({ otherParticipantId }, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `/message/get-messages/${otherParticipantId}`
      );
      return response?.data || null;
    } catch (error) {
      const errMessage = error?.response?.data?.errorMessage;
      return rejectWithValue(errMessage || "something went wrong");
    }
  }
);
const seenMessagesThunk = createAsyncThunk(
  "message/seenMessages",
  async ({ senderId }, { rejectWithValue }) => {
    // console.log("you ", senderId, ":   i ve seen");
    try {
      const response = await api.put(`/message/seen/${senderId}`);
      return response?.data || null;
    } catch (error) {
      const errMessage = error?.response?.data?.errorMessage;
      return rejectWithValue(errMessage || "something went wrong");
    }
  }
);

export { sendMessageThunk, getMessagesThunk, seenMessagesThunk };
