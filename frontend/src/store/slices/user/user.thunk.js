import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const loginUserThunk = createAsyncThunk("users/login", async () => {
  try {
    console.log("hellow thunk");
    toast.success("login success");
  } catch (error) {}
});

export { loginUserThunk };
