import { createAsyncThunk } from "@reduxjs/toolkit";
// import toast from "react-hot-toast";
import { api } from "../../../components/utilities/axios.utility.js";
import toast from "react-hot-toast";

const loginUserThunk = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await api.post("/user/login", { email, password });

      console.log(response?.data);

      toast.success("Logged in succesfully");
      return response?.data || null;
    } catch (error) {
      const errMessage = error?.response?.data?.errorMessage;
      toast.error(errMessage);
      return rejectWithValue(errMessage || "something went wrong");
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

      console.log(response?.data);

      toast.success("Registered in succesfully");
      return response?.data || null;
    } catch (error) {
      const errMessage = error?.response?.data?.errorMessage;
      toast.error(errMessage);
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
      toast.error(errMessage);
      return rejectWithValue(errMessage || "something went wrong");
    }
  }
);

export { loginUserThunk, registerUserThunk, logoutUserThunk };
