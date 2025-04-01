import { createAsyncThunk } from "@reduxjs/toolkit";

const loginUserThunk = createAsyncThunk("users/fetchById", async () => {
  console.log("hellow thunk");
});

export { loginUserThunk };
