import { createAsyncThunk } from "@reduxjs/toolkit";
// import toast from "react-hot-toast";
import { api } from "../../../components/utilities/axios.utility.js";
import toast from "react-hot-toast";

const loginUserThunk = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await api.post("/user/login", { email, password });
      toast.success("Logged in succesfully");
      return response?.data || null;
    } catch (error) {
      const errData = error?.response?.data;
      return rejectWithValue(errData || "something went wrong"); //! make others also errData
    }
  }
);
const registerUserThunk = createAsyncThunk(
  "user/register",
  async ({ username, email, password, gender }, { rejectWithValue }) => {
    try {
      const response = await api.post("/user/register", {
        username,
        email,
        password,
        gender,
      });
      toast.success("Registered in succesfully");
      return response?.data || null;
    } catch (error) {
      const errMessage = error?.response?.data?.errorMessage;
      toast.error(errMessage);
      return rejectWithValue(errMessage || "something went wrong");
    }
  }
);
const getUserThunk = createAsyncThunk(
  "user/getUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/user/get-user");
      return response?.data || null;
    } catch (error) {
      const errMessage = error?.response?.data?.errorMessage;
      return rejectWithValue(errMessage || "something went wrong");
    }
  }
);
const updateUserThunk = createAsyncThunk(
  "user/updateUser",
  async ({ data }, { rejectWithValue }) => {
    try {
      const response = await api.patch("/user/update-user", { ...data });
      return response?.data?.responseData || null;
    } catch (error) {
      const errMessage = error?.response?.data?.errorMessage;
      return rejectWithValue(errMessage || "something went wrong");
    }
  }
);

const updateUserAvatarThunk = createAsyncThunk(
  "user/updateUserAvatar",
  async ({ avatarFormData }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/user/upload/avatar`, avatarFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response?.data?.responseData?.avatar || null;
    } catch (error) {
      const errMessage = error?.response?.data?.errorMessage;
      return rejectWithValue(errMessage || "something went wrong");
    }
  }
);

const logoutUserThunk = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.post("/user/logout");
      toast.success("Logged out succesfully");
      return response?.data || null;
    } catch (error) {
      const errMessage = error?.response?.data?.errorMessage;
      return rejectWithValue(errMessage || "something went wrong");
    }
  }
);
const getOtherUsersThunk = createAsyncThunk(
  "user/getOtherUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/user/get-other-users");
      return response?.data || null;
    } catch (error) {
      const errMessage = error?.response?.data?.errorMessage;
      return rejectWithValue(errMessage || "something went wrong");
    }
  }
);

const getAllLatestUserMessagesThunk = createAsyncThunk(
  "message/getAllLatestUserMessages",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`/message/get-latest-messages`);
      return response?.data || null;
    } catch (error) {
      const errMessage = error?.response?.data?.errorMessage;
      return rejectWithValue(errMessage || "something went wrong");
    }
  }
);

export {
  loginUserThunk,
  registerUserThunk,
  logoutUserThunk,
  getUserThunk,
  updateUserThunk,
  getOtherUsersThunk,
  getAllLatestUserMessagesThunk,
  updateUserAvatarThunk,
};
