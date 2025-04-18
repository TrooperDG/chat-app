import { createAsyncThunk } from "@reduxjs/toolkit";
// import toast from "react-hot-toast";
import { api } from "../../../components/utilities/axios.utility.js";
// import toast from "react-hot-toast";

const sendMessageThunk = createAsyncThunk(
  "message/send",
  async ({ receiverId, message }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/message/send/${receiverId}`, {
        message,
      });
      // toast.success("Logged in succesfully");
      // console.log("MSG", response);
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
    console.log("thunk", otherParticipantId);
    try {
      const response = await api.get(
        `/message/get-messages/${otherParticipantId}`
      );
      // toast.success("Logged in succesfully");
      // console.log("MSG", response);
      return response?.data || null;
    } catch (error) {
      // console.log("MSGerror", error);
      const errMessage = error?.response?.data?.errorMessage;
      return rejectWithValue(errMessage || "something went wrong");
    }
  }
);

export { sendMessageThunk, getMessagesThunk };
